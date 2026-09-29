import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined } from "../../util/assert";
import { DamageDisplay } from "../settings/godsightsettings";

export class OmenCancelAction extends BattleAction {
  public actionType: ActionType = ActionType.OMEN_CANCELLED;
  public subactions: BattleAction[] = [];

  constructor(
    public bossName: string,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(key: number, damageDisplay: DamageDisplay): JSX.Element {
    return (
      <div key={key} className="action-description">{this.bossName}&apos;s omen was canceled!
      </div>
    )
  }

  static override fromJSON(json: Record<string, unknown>): OmenCancelAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.OMEN_CANCELLED) {
      return new OmenCancelAction(
        assertNotNullOrUndefined(json["bossName"] as string),
      );
    } else {
      console.error(`OmenCancelAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}