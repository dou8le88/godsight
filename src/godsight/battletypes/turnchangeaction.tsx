import { JSX } from 'react/jsx-runtime';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { assertNotNullOrUndefined } from '../../util/assert';
import { GodsightSettings } from '../settings/godsightsettings';

export class TurnChangeAction extends BattleAction {
  public actionType: ActionType = ActionType.TURN_CHANGE;
  public subactions: BattleAction[] = [];

  constructor(
    public currentTurn: number,
    public newTurn: number,
    public beforeBossTurn: boolean,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(key: number, _settings: GodsightSettings): JSX.Element {
    return (
      <div
        key={key}
        className="action-description"
      >
        The turn counter advanced by {this.newTurn - this.currentTurn}!
      </div>
    );
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): TurnChangeAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.TURN_CHANGE) {
      return new TurnChangeAction(
        assertNotNullOrUndefined(json['currentTurn'] as number),
        assertNotNullOrUndefined(json['newTurn'] as number),
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
      );
    } else {
      console.error(`TurnChangeAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
