import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { HealingInstance } from "./healinginstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class HealingAction extends BattleAction {
  public actionType: ActionType = ActionType.HEAL;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public target: Actor,
    public healingInstances: HealingInstance[],
  ) {
    super();
  }

  getSimpleDescription(): string {
    const healing = this.healingInstances.map(h => h["value"]).join("+");

    return `${this.target} was healed for ${healing}!`;
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();

    // Bosses can heal as well but we do not currently track that.
    if (this.target == Actor.PLAYER) {
      this.healingInstances.forEach(instance => {
        if (!update["characterStats"][instance["receiverPosition"]]) {
          update["characterStats"][instance["receiverPosition"]] = StatsUpdateHelper.getEmptyStats();
        }
        update["generalStats"]["healingReceived"] += instance["value"];
        update["characterStats"][instance["receiverPosition"]]["healingReceived"] += instance["value"];
      });
    }

    return update;
  }

  static fromJSON(json: { [key: string]: any; }): HealingAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.HEAL) {
      return new HealingAction(
        json["actionNumber"] as number,
        json["target"] as Actor,
        json["healingInstances"] as HealingInstance[],
      );
    } else {
      console.error(`HealingAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}