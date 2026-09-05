import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class DeathAction extends BattleAction {
  public actionType: ActionType = ActionType.DEATH;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public target: Actor,
    public position: number,
    public index: number | null,
  ) {
    super();
  }

  getDescription(): string {
    return `${this.target} at position ${this.position} was knocked out!`;
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  static fromJSON(json: { [key: string]: any; }): DeathAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.DEATH) {
      return new DeathAction(
        json["actionNumber"] as number,
        json["target"] as Actor,
        json["position"] as number,
        json["index"] as number | null,
      );
    } else {
      console.error(`DeathAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}