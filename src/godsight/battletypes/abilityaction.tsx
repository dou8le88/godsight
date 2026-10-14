import { JSX } from 'react/jsx-runtime';
import { Actor } from '../../gbf/battletypes/scenariodata/mechanics/actor';
import { GameElementHelper } from '../../gbf/battletypes/scenariodata/mechanics/element';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { BattleActionParser } from './battleactionparser';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { assertNotNullOrUndefined } from '../../util/assert';
import { GodsightSettings } from '../settings/godsightsettings';
import { DamageAction } from './damageaction';

export class AbilityAction extends BattleAction {
  public actionType: ActionType = ActionType.ACTIVATED_ABILITY;
  public overrideMessage = '';

  constructor(
    public name: string,
    public actor: Actor,
    public sourceName: string,
    public sourceIndex: number,
    public partySize: number,
    public beforeBossTurn: boolean,
    public isFatedChain: boolean,
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(key: number, settings: GodsightSettings): JSX.Element {
    if (this.overrideMessage) {
      return (
        <div
          key={key}
          className="action-description"
        >
          {this.overrideMessage}
          {this.subactions.map((subaction, idx) =>
            subaction.getDescription(idx, settings),
          )}
        </div>
      );
    } else {
      return (
        <div
          key={key}
          className="action-description"
        >
          {' '}
          {this.sourceName} activated {this.name}!
          {this.subactions.map((subaction, idx) =>
            subaction.getDescription(idx, settings),
          )}
        </div>
      );
    }
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);
    const firstDamageAction = this.subactions.find(
      (action) => action instanceof DamageAction,
    );
    // The first damage action might be relevant if this is a Fated Chain.
    const firstDamageActionStats = firstDamageAction
      ? firstDamageAction.getStats()
      : StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);
    const subactionStatsUpdates = this.subactions.map((action) =>
      action.getStats(),
    );
    const allUpdates = subactionStatsUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update,
    );
    switch (this.actor) {
      case Actor.PLAYER: {
        // The subactions have no way to associate certain general stats with
        // a specific character, so we must do it here.
        const subactionHitCount = allUpdates['generalStats']['hitCount'];
        const subactionDebuffs =
          allUpdates['generalStats']['debuffsInflictedCount'];
        const subactionNormalAttackDamage =
          allUpdates['generalStats']['normalAttackDamage'];
        const subactionSkillDamage = allUpdates['generalStats']['skillDamage'];
        const subactionOtherDamage = allUpdates['generalStats']['otherDamage'];

        if (this.isFatedChain) {
          // The first damage subaction should be the fated chain damage.
          // It will have been incorrectly calculated as skill damage, when it should be Other.
          GameElementHelper.getAllElements().forEach((element) => {
            subactionSkillDamage[element] -=
              firstDamageActionStats['generalStats']['skillDamage'][element];
            subactionOtherDamage[element] +=
              firstDamageActionStats['generalStats']['skillDamage'][element];
          });
        }

        allUpdates['characterStats'][this.sourceIndex]['hitCount'] +=
          subactionHitCount;
        allUpdates['characterStats'][this.sourceIndex][
          'debuffsInflictedCount'
        ] += subactionDebuffs;
        if (this.beforeBossTurn) {
          allUpdates['characterBeforeBossTurnStats'][this.sourceIndex][
            'hitCount'
          ] += subactionHitCount;
          allUpdates['characterBeforeBossTurnStats'][this.sourceIndex][
            'debuffsInflictedCount'
          ] += subactionDebuffs;
        }
        GameElementHelper.getAllElements().forEach((element) => {
          allUpdates['characterStats'][this.sourceIndex]['skillDamage'][
            element
          ] += subactionSkillDamage[element];
          allUpdates['characterStats'][this.sourceIndex]['normalAttackDamage'][
            element
          ] += subactionNormalAttackDamage[element];
          allUpdates['characterStats'][0]['otherDamage'][element] +=
            subactionOtherDamage[element];
          if (this.beforeBossTurn) {
            allUpdates['characterBeforeBossTurnStats'][this.sourceIndex][
              'skillDamage'
            ][element] += subactionSkillDamage[element];
            allUpdates['characterBeforeBossTurnStats'][this.sourceIndex][
              'normalAttackDamage'
            ][element] += subactionNormalAttackDamage[element];
            allUpdates['characterBeforeBossTurnStats'][0]['otherDamage'][
              element
            ] += subactionOtherDamage[element];
          }
        });
        break;
      }
      case Actor.BOSS:
        // The boss used an "ability", can happen in certain raids.
        // Due to the quirks of the underlying commands, stats should be tracked correctly
        // via subactions in this case.
        break;
      default:
        console.error(`Got unknown target ${this.actor} for AbilityAction`);
        break;
    }

    return allUpdates;
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): AbilityAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.ACTIVATED_ABILITY) {
      const action = new AbilityAction(
        assertNotNullOrUndefined(json['name'] as string),
        assertNotNullOrUndefined(json['actor'] as Actor),
        assertNotNullOrUndefined(json['sourceName'] as string),
        assertNotNullOrUndefined(json['sourceIndex'] as number),
        assertNotNullOrUndefined(json['partySize'] as number),
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
        assertNotNullOrUndefined(json['isFatedChain'] as boolean),
        (json['subactions'] as Record<string, unknown>[]).map((action) => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
      if (json['overrideMessage']) {
        action.overrideMessage = json['overrideMessage'] as string;
      }
      return action;
    } else {
      console.error(`AbilityAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
