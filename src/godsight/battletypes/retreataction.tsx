import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined } from "../../util/assert";

export class RetreatAction extends BattleAction {
  public actionType: ActionType = ActionType.RETREAT;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }
  getDescription(): JSX.Element {
    return (
      <div key={this.actionNumber} className="action-description">The party retreated!
      </div>
    );
  }

  static fromJSON(json: { [key: string]: any; }): RetreatAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.RETREAT) {
      return new RetreatAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
      );
    } else {
      console.error(`RetreatAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}