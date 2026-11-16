import { JSX } from 'react/jsx-runtime';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { BattleActionParser } from './battleactionparser';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { NormalAttackAction } from './normalattackaction';
import { assertNotNullOrUndefined } from '../../util/assert';
import { GodsightSettings } from '../settings/godsightsettings';
import { Actor } from '../../gbf/battletypes/scenariodata/mechanics/actor';
import { ConditionChangeAction } from './conditionchangeaction';

export class NormalAttackGroupAction extends BattleAction {
  public actionType: ActionType = ActionType.NORMAL_ATTACK_GROUP;

  constructor(
    public attackerName: string,
    public isCounter: boolean,
    public partySize: number,
    public beforeBossTurn: boolean,
    public subactions: BattleAction[],
  ) {
    super();
  }

  // #futureproof
  private attackCountWording: Record<number, string> = {
    0: "couldn't attack",
    1: 'made a single attack',
    2: 'made a double attack',
    3: 'made a triple attack',
    4: 'made a quadruple attack',
    5: 'made a quintuple attack',
    6: 'made a sextuple attack',
    7: 'made a septuple attack',
    8: 'made an octuple attack',
    9: 'made a nonuple attack',
    10: 'made a decuple attack',
  };

  getDescription(key: number, settings: GodsightSettings): JSX.Element {
    const attacks = this.subactions.filter(
      (a) => a instanceof NormalAttackAction,
    );
    const attackCount = attacks.length;
    const attackWording = this.isCounter
      ? 'executed a counter'
      : this.attackCountWording[attackCount] || 'made unknown attacks';

    return (
      <div
        key={key}
        className="action-description"
      >
        {this.attackerName} {attackWording}!
        {this.subactions.map((subaction, idx) =>
          subaction.getDescription(idx, settings),
        )}
      </div>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);

    const attacks = this.subactions.filter(
      (a) => a instanceof NormalAttackAction,
    );
    const attackCount = attacks.length;

    const nonStatusEffectSubactionUpdates = this.subactions
      .filter((a) => !(a instanceof ConditionChangeAction))
      .map((action) => action.getStats());

    const statusEffectSubactionUpdates = this.subactions
      .filter((a) => a instanceof ConditionChangeAction)
      .map((action) => action.getStats());

    const statusEffectUpdate = statusEffectSubactionUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      StatsUpdateHelper.getEmptyStatsUpdate(),
    );

    if (
      attackCount > 0 &&
      !this.isCounter &&
      attacks[0]['source'] == Actor.PLAYER
    ) {
      const attacker = attacks[0]['attackerIndex'];
      update['generalStats']['normalAttacks'] += 1;
      update['characterStats'][attacker]['normalAttacks'] += 1;
      update['characterStats'][attacker]['debuffsInflictedCount'] +=
        statusEffectUpdate['generalStats']['debuffsInflictedCount'];
      if (attackCount == 3) {
        update['generalStats']['tripleAttacks'] += 1;
        update['characterStats'][attacker]['tripleAttacks'] += 1;
      }
      if (this.beforeBossTurn) {
        update['beforeBossTurnStats']['normalAttacks'] += 1;
        update['characterBeforeBossTurnStats'][attacker]['normalAttacks'] += 1;
        update['characterBeforeBossTurnStats'][attacker][
          'debuffsInflictedCount'
        ] += statusEffectUpdate['generalStats']['debuffsInflictedCount'];

        if (attackCount == 3) {
          update['beforeBossTurnStats']['tripleAttacks'] += 1;
          update['characterBeforeBossTurnStats'][attacker]['tripleAttacks'] +=
            1;
        }
      }
    }

    return StatsUpdateHelper.concatUpdates(
      nonStatusEffectSubactionUpdates.reduce(
        (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
        update,
      ),
      statusEffectUpdate,
    );
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): NormalAttackGroupAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.NORMAL_ATTACK_GROUP) {
      return new NormalAttackGroupAction(
        assertNotNullOrUndefined(json['attackerName'] as string),
        assertNotNullOrUndefined(json['isCounter'] as boolean),
        assertNotNullOrUndefined(json['partySize'] as number),
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
        (json['subactions'] as Record<string, unknown>[]).map((action) => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`NormalAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
