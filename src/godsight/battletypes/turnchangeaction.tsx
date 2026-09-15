import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined } from "../../util/assert";

export class TurnChangeAction extends BattleAction {
  public actionType: ActionType = ActionType.TURN_CHANGE;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public currentTurn: number,
    public newTurn: number,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(): JSX.Element {
    return (
      <div key={this.actionNumber} className="action-description">The turn counter advanced by {this.newTurn - this.currentTurn}!
      </div>
    );
  }

  static fromJSON(json: { [key: string]: any; }): TurnChangeAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.TURN_CHANGE) {
      return new TurnChangeAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["currentTurn"] as number),
        assertNotNullOrUndefined(json["newTurn"] as number),
      );
    } else {
      console.error(`TurnChangeAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}