import { JSX } from 'react/jsx-runtime';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { BattleActionParser } from './battleactionparser';
import { DamageInstance } from './damageinstance';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { BattleActionHelper } from './battleactionhelper';
import { assertNotNullOrUndefined } from '../../util/assert';
import { GodsightSettings } from '../settings/godsightsettings';
import { GameElementHelper } from '../../gbf/battletypes/scenariodata/mechanics/element';
import { AbilityAction } from './abilityaction';

export class SummonAction extends BattleAction {
  public actionType: ActionType = ActionType.CALLED_SUMMON;

  constructor(
    public summonName: string,
    public summonCallName: string,
    public lyriaIndex: number,
    public mainCharacterName: string,
    public partySize: number,
    public beforeBossTurn: boolean,
    public damageInstances: DamageInstance[],
    public subactions: BattleAction[],
    public trueSummonHitCount: number | undefined,
  ) {
    super();
  }

  getDescription(key: number, settings: GodsightSettings): JSX.Element {
    let damageInstanceJsx = <></>;
    if (this.damageInstances.length) {
      damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
        this.damageInstances,
        settings['damageDisplay'],
        this.trueSummonHitCount,
      );
    }

    let summonerName = this.mainCharacterName;
    if (this.lyriaIndex != -1) {
      summonerName = 'Lyria';
    }

    return (
      <div
        key={key}
        className="action-description"
      >
        {summonerName} summoned {this.summonName} with the call{' '}
        {this.summonCallName}!{damageInstanceJsx}
        {this.subactions.map((subaction, idx) =>
          subaction.getDescription(idx, settings),
        )}
      </div>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);
    // Summons are attributed to Lyria if she's in the party, and MC otherwise.
    const summonSourceIndex = this.lyriaIndex != -1 ? this.lyriaIndex : 0;

    this.damageInstances.forEach((instance) => {
      update['generalStats']['otherDamage'][instance['element']] +=
        instance['value'];
      update['characterStats'][summonSourceIndex]['otherDamage'][
        instance['element']
      ] += instance['value'];
      if (this.beforeBossTurn) {
        update['beforeBossTurnStats']['otherDamage'][instance['element']] +=
          instance['value'];
        update['characterBeforeBossTurnStats'][summonSourceIndex][
          'otherDamage'
        ][instance['element']] += instance['value'];
      }

      if (instance['value'] > 0) {
        update['generalStats']['hitCount'] += 1;
        update['characterStats'][summonSourceIndex]['hitCount'] += 1;
        if (this.beforeBossTurn) {
          update['beforeBossTurnStats']['hitCount'] += 1;
          update['characterBeforeBossTurnStats'][summonSourceIndex][
            'hitCount'
          ] += 1;
        }
      }
    });

    const maybeHitCountOverride = this.trueSummonHitCount;
    if (
      maybeHitCountOverride !== undefined &&
      maybeHitCountOverride > update['generalStats']['hitCount']
    ) {
      update['generalStats']['hitCount'] = maybeHitCountOverride;
      update['characterStats'][summonSourceIndex]['hitCount'] =
        maybeHitCountOverride;
      if (this.beforeBossTurn) {
        update['beforeBossTurnStats']['hitCount'] = maybeHitCountOverride;
        update['characterBeforeBossTurnStats'][summonSourceIndex]['hitCount'] =
          maybeHitCountOverride;
      }
    }

    // Summon skill damage is weird. Some summons like Bubs do skill damage
    // as a direct subaction of the summon call, while some like M3 summons
    // do it with an Ability subaction that itself contains a damage action.
    // In the former case, we want to correct the damage dealt to attribute it to MC/Lyria.
    // In the latter case, the Ability subaction does that for us.
    const abilitySubactionUpdates = this.subactions
      .filter((a) => a instanceof AbilityAction)
      .map((a) => a.getStats());

    const mergedAbilitySubactionUpdates = abilitySubactionUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      StatsUpdateHelper.getEmptyStatsUpdate(this.partySize),
    );

    const nonAbilitySubactionUpdates = this.subactions
      .filter((a) => !(a instanceof AbilityAction))
      .map((a) => a.getStats());

    const mergedNonAbilitySubactionUpdates = nonAbilitySubactionUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      StatsUpdateHelper.getEmptyStatsUpdate(this.partySize),
    );

    const nonAbilitySubactionHitCount =
      mergedNonAbilitySubactionUpdates['generalStats']['hitCount'];
    const nonAbilitySubactionSkillDamage =
      mergedNonAbilitySubactionUpdates['generalStats']['skillDamage'];
    const nonAbilitySubactionDebuffCount =
      mergedNonAbilitySubactionUpdates['generalStats']['debuffsInflictedCount'];

    update['characterStats'][summonSourceIndex]['hitCount'] +=
      nonAbilitySubactionHitCount;
    update['characterStats'][summonSourceIndex]['debuffsInflictedCount'] +=
      nonAbilitySubactionDebuffCount;
    GameElementHelper.getAllElements().forEach((element) => {
      update['characterStats'][summonSourceIndex]['skillDamage'][element] +=
        nonAbilitySubactionSkillDamage[element];
    });

    if (this.beforeBossTurn) {
      update['characterBeforeBossTurnStats'][summonSourceIndex]['hitCount'] +=
        nonAbilitySubactionHitCount;
      update['characterBeforeBossTurnStats'][summonSourceIndex][
        'debuffsInflictedCount'
      ] += nonAbilitySubactionDebuffCount;
      GameElementHelper.getAllElements().forEach((element) => {
        update['characterBeforeBossTurnStats'][summonSourceIndex][
          'skillDamage'
        ][element] += nonAbilitySubactionSkillDamage[element];
      });
    }

    return StatsUpdateHelper.concatUpdates(
      StatsUpdateHelper.concatUpdates(update, mergedAbilitySubactionUpdates),
      mergedNonAbilitySubactionUpdates,
    );
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): SummonAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.CALLED_SUMMON) {
      return new this(
        assertNotNullOrUndefined(json['summonName'] as string),
        assertNotNullOrUndefined(json['summonCallName'] as string),
        assertNotNullOrUndefined(json['lyriaIndex'] as number),
        assertNotNullOrUndefined(json['mainCharacterName'] as string),
        assertNotNullOrUndefined(json['partySize'] as number),
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
        assertNotNullOrUndefined(json['damageInstances'] as DamageInstance[]),
        (json['subactions'] as Record<string, unknown>[]).map((action) => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
        json['trueSummonHitCount'] as number | undefined,
      );
    } else {
      console.error(`this.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
