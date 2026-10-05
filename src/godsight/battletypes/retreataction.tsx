import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { GodsightSettings } from "../settings/godsightsettings";
import { assertNotNullOrUndefined } from "../../util/assert";

export class RetreatAction extends BattleAction {
  public actionType: ActionType = ActionType.RETREAT;
  public subactions: BattleAction[] = [];

  constructor(
    public beforeBossTurn: boolean,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDescription(key: number, settings: GodsightSettings): JSX.Element {
    return (
      <div key={key} className="action-description">The party retreated!
      </div>
    );
  }

  static override fromJSON(json: Record<string, unknown>): RetreatAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.RETREAT) {
      return new RetreatAction(
        assertNotNullOrUndefined(json["beforeBossTurn"] as boolean),
      );
    } else {
      console.error(`RetreatAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}