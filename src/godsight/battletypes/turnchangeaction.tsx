import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined } from "../../util/assert";
import { DamageDisplay } from "../settings/godsightsettings";

export class TurnChangeAction extends BattleAction {
  public actionType: ActionType = ActionType.TURN_CHANGE;
  public subactions: BattleAction[] = [];

  constructor(
    public currentTurn: number,
    public newTurn: number,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(key: number, damageDisplay: DamageDisplay): JSX.Element {
    return (
      <div key={key} className="action-description">The turn counter advanced by {this.newTurn - this.currentTurn}!
      </div>
    );
  }

  static override fromJSON(json: Record<string, unknown>): TurnChangeAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.TURN_CHANGE) {
      return new TurnChangeAction(
        assertNotNullOrUndefined(json["currentTurn"] as number),
        assertNotNullOrUndefined(json["newTurn"] as number),
      );
    } else {
      console.error(`TurnChangeAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}