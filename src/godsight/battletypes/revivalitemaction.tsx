import { JSX } from 'react/jsx-runtime';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { BattleActionParser } from './battleactionparser';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { GodsightSettings } from '../settings/godsightsettings';
import { assertNotNullOrUndefined } from '../../util/assert';

export class RevivalItemAction extends BattleAction {
  public actionType: ActionType = ActionType.USED_REVIVAL_ITEM;

  constructor(
    public beforeBossTurn: boolean,
    public isFullElixir: boolean,
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(key: number, settings: GodsightSettings): JSX.Element {
    let itemName = 'revival item';
    if (this.isFullElixir) {
      itemName = 'Full Elixir';
    }
    return (
      <div
        key={key}
        className="action-description"
      >
        The party used a {itemName}!
        {this.subactions.map((subaction, idx) =>
          subaction.getDescription(idx, settings),
        )}
      </div>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();
    const subactionUpdates = this.subactions.map((action) => action.getStats());

    return subactionUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update,
    );
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): RevivalItemAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.USED_REVIVAL_ITEM) {
      return new RevivalItemAction(
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
        assertNotNullOrUndefined(json['isFullElixir'] as boolean),
        (json['subactions'] as Record<string, unknown>[]).map((action) => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`FullElixirAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
