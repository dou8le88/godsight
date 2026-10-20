import { Actor } from '../../gbf/battletypes/scenariodata/mechanics/actor';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { DamageInstance } from './damageinstance';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { JSX } from 'react/jsx-runtime';
import { BattleActionHelper } from './battleactionhelper';
import { assertNotNullOrUndefined } from '../../util/assert';
import { GodsightSettings } from '../settings/godsightsettings';

export class SingularNormalAttackAction extends BattleAction {
  public actionType: ActionType = ActionType.SINGULAR_NORMAL_ATTACK;
  public subactions: BattleAction[] = [];

  constructor(
    public source: Actor,
    public attackerIndex: number,
    public isCounter: boolean,
    public partySize: number,
    public beforeBossTurn: boolean,
    public damageInstances: DamageInstance[],
  ) {
    super();
  }

  getDescription(key: number, settings: GodsightSettings): JSX.Element {
    const damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
      this.damageInstances,
      settings['damageDisplay'],
    );

    return <span key={key}>{damageInstanceJsx}</span>;
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);

    switch (this.source) {
      case Actor.PLAYER:
        this.damageInstances.forEach((instance) => {
          const attackerIndex = this.attackerIndex;
          update['generalStats']['normalAttackDamage'][instance['element']] +=
            instance['value'];
          update['characterStats'][attackerIndex]['normalAttackDamage'][
            instance['element']
          ] += instance['value'];
          if (this.beforeBossTurn) {
            update['beforeBossTurnStats']['normalAttackDamage'][
              instance['element']
            ] += instance['value'];
            update['characterBeforeBossTurnStats'][attackerIndex][
              'normalAttackDamage'
            ][instance['element']] += instance['value'];
          }
          if (instance['value'] > 0) {
            update['generalStats']['hitCount'] += 1;
            update['generalStats']['normalAttackHits'] += 1;
            update['characterStats'][attackerIndex]['hitCount'] += 1;
            update['characterStats'][attackerIndex]['normalAttackHits'] += 1;
            if (this.beforeBossTurn) {
              update['beforeBossTurnStats']['hitCount'] += 1;
              update['beforeBossTurnStats']['normalAttackHits'] += 1;
              update['characterBeforeBossTurnStats'][attackerIndex][
                'hitCount'
              ] += 1;
              update['characterBeforeBossTurnStats'][attackerIndex][
                'normalAttackHits'
              ] += 1;
            }
          }
        });
        break;
      case Actor.BOSS:
        this.damageInstances.forEach((instance) => {
          update['generalStats']['damageTaken'][instance['element']] +=
            instance['value'];
          update['characterStats'][instance['receiverIndex']]['damageTaken'][
            instance['element']
          ] += instance['value'];
          if (this.beforeBossTurn) {
            update['beforeBossTurnStats']['damageTaken'][instance['element']] +=
              instance['value'];
            update['characterBeforeBossTurnStats'][instance['receiverIndex']][
              'damageTaken'
            ][instance['element']] += instance['value'];
          }
        });
        break;
      default:
        console.error(
          `Unknown actor ${this.source} in SingularNormalAttackAction`,
        );
        break;
    }

    return update;
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): SingularNormalAttackAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.SINGULAR_NORMAL_ATTACK) {
      return new SingularNormalAttackAction(
        assertNotNullOrUndefined(json['source'] as Actor),
        assertNotNullOrUndefined(json['attackerIndex'] as number),
        assertNotNullOrUndefined(json['isCounter'] as boolean),
        assertNotNullOrUndefined(json['partySize'] as number),
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
        assertNotNullOrUndefined(json['damageInstances'] as DamageInstance[]),
      );
    } else {
      console.error(`SingularNormalAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
