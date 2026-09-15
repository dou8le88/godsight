import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { HealingInstance } from "./healinginstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { assertNotNullOrUndefined } from "../../util/assert";

export class HealingAction extends BattleAction {
  public actionType: ActionType = ActionType.HEAL;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public target: Actor,
    public partySize: number,
    public healingInstances: HealingInstance[],
  ) {
    super();
  }

  getDescription(): JSX.Element {
    const healingJsx = BattleActionHelper.getHealingInstanceJsx(
      this.healingInstances,
    );

    return (
      <span key={this.actionNumber}>
        {healingJsx}
      </span>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);

    // Bosses can heal as well but we do not currently track that.
    if (this.target == Actor.PLAYER) {
      this.healingInstances.forEach(instance => {
        update["generalStats"]["healingReceived"] += instance["value"];
        update["characterStats"][instance["receiverIndex"]]["healingReceived"] += instance["value"];
      });
    }

    return update;
  }

  static fromJSON(json: { [key: string]: any; }): HealingAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.HEAL) {
      return new HealingAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["partySize"] as number),
        assertNotNullOrUndefined(json["healingInstances"] as HealingInstance[]),
      );
    } else {
      console.error(`HealingAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}