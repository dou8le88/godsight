import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined, assertNotUndefined } from "../../util/assert";
import { DamageDisplay } from "../settings/godsightsettings";

export class DeathAction extends BattleAction {
  public actionType: ActionType = ActionType.DEATH;
  public subactions: BattleAction[] = [];

  constructor(
    public target: Actor,
    public targetName: string,
    public index: number | null,
  ) {
    super();
  }

  getDescription(key: number, damageDisplay: DamageDisplay): JSX.Element {
    return (
      <div key={key} className="action-description">{this.targetName} was knocked out!
      </div>
    );
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  static override fromJSON(json: Record<string, unknown>): DeathAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.DEATH) {
      return new DeathAction(
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["targetName"] as string),
        assertNotUndefined(json["index"] as number | null),
      );
    } else {
      console.error(`DeathAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}