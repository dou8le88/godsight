import { JSX } from 'react/jsx-runtime';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { DamageInstance } from './damageinstance';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { BattleActionHelper } from './battleactionhelper';
import { assertNotNullOrUndefined } from '../../util/assert';
import { GodsightSettings } from '../settings/godsightsettings';

export class ChainBurstAction extends BattleAction {
  public actionType: ActionType = ActionType.CHAIN_BURST;
  public subactions: BattleAction[] = [];

  constructor(
    public chainCount: number,
    public name: string,
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

    return (
      <div
        key={key}
        className="action-description"
      >
        {' '}
        The party activated the chain burst {this.name}!{damageInstanceJsx}
      </div>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);

    this.damageInstances.forEach((instance) => {
      update['generalStats']['otherDamage'][instance['element']] +=
        instance['value'];
      // Chain burst is considered "MC's" damage by the game.
      update['characterStats'][0]['otherDamage'][instance['element']] +=
        instance['value'];
      if (this.beforeBossTurn) {
        update['beforeBossTurnStats']['otherDamage'][instance['element']] +=
          instance['value'];
        update['characterBeforeBossTurnStats'][0]['otherDamage'][
          instance['element']
        ] += instance['value'];
      }
      if (instance['value'] > 0) {
        update['generalStats']['hitCount'] += 1;
        if (this.beforeBossTurn) {
          update['beforeBossTurnStats']['hitCount'] += 1;
        }
        update['characterStats'][0]['hitCount'] += 1;
      }
    });

    return update;
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): ChainBurstAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.CHAIN_BURST) {
      return new ChainBurstAction(
        assertNotNullOrUndefined(json['chainCount'] as number),
        assertNotNullOrUndefined(json['name'] as string),
        assertNotNullOrUndefined(json['partySize'] as number),
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
        assertNotNullOrUndefined(json['damageInstances'] as DamageInstance[]),
      );
    } else {
      console.error(`ChainBurstAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
