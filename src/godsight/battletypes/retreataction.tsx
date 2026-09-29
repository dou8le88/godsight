import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { DamageDisplay } from "../settings/godsightsettings";

export class RetreatAction extends BattleAction {
  public actionType: ActionType = ActionType.RETREAT;
  public subactions: BattleAction[] = [];

  constructor(
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }
  getDescription(key: number, damageDisplay: DamageDisplay): JSX.Element {
    return (
      <div key={key} className="action-description">The party retreated!
      </div>
    );
  }

  static override fromJSON(json: Record<string, unknown>): RetreatAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.RETREAT) {
      return new RetreatAction();
    } else {
      console.error(`RetreatAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}