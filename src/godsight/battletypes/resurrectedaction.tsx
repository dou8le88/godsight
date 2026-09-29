import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined } from "../../util/assert";
import { DamageDisplay } from "../settings/godsightsettings";

export class ResurrectedAction extends BattleAction {
  public actionType: ActionType = ActionType.RESURRECTED;
  public subactions: BattleAction[] = [];

  constructor(
    public resurrectedCharacterName: string,
    public resurrectionCause: string,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(key: number, damageDisplay: DamageDisplay): JSX.Element {
    return (
      <div key={key} className="action-description">{this.resurrectedCharacterName} was revived by {this.resurrectionCause}!
      </div>
    );
  }

  static override fromJSON(json: Record<string, unknown>): ResurrectedAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.RESURRECTED) {
      return new ResurrectedAction(
        assertNotNullOrUndefined(json["resurrectedCharacterName"] as string),
        assertNotNullOrUndefined(json["resurrectionCause"] as string),
      );
    } else {
      console.error(`ResurrectedAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}