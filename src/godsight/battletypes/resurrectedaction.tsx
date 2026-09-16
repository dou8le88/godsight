import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined } from "../../util/assert";

export class ResurrectedAction extends BattleAction {
  public actionType: ActionType = ActionType.RESURRECTED;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public resurrectedCharacterName: string,
    public resurrectionCause: string,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(): JSX.Element {
    return (
      <div key={this.actionNumber} className="action-description">{this.resurrectedCharacterName} was revived by {this.resurrectionCause}!
      </div>
    );
  }

  static override fromJSON(json: Record<string, unknown>): ResurrectedAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.RESURRECTED) {
      return new ResurrectedAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["resurrectedCharacterName"] as string),
        assertNotNullOrUndefined(json["resurrectionCause"] as string),
      );
    } else {
      console.error(`ResurrectedAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}