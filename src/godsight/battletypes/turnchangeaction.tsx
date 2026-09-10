import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { GodsightBattleData } from "./battledata";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

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
      <>
        <div className="action-description">The turn counter advanced by {this.newTurn - this.currentTurn}!
        </div>
      </>
    );
  }

  static fromJSON(json: { [key: string]: any; }): TurnChangeAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.TURN_CHANGE) {
      return new TurnChangeAction(
        json["actionNumber"] as number,
        json["currentTurn"] as number,
        json["newTurn"] as number,
      );
    } else {
      console.error(`TurnChangeAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}