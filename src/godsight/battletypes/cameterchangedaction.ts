import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class CAMeterChangedAction extends BattleAction {
  public actionType: ActionType = ActionType.CA_METER_CHANGED;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public target: Actor,
    public position: number,
    public newValue: number,
    public change: number,
  ) {
    super();
  }

  getDescription(): string {
    if (this.change > 0) {
      return `${this.target} at position ${this.position} gained ${this.change} meter! (total: ${this.newValue})`;
    } else {
      return `${this.target} at position ${this.position} lost ${this.change} meter! (total: ${this.newValue})`;
    }
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  static fromJSON(json: { [key: string]: any; }): CAMeterChangedAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CA_METER_CHANGED) {
      return new CAMeterChangedAction(
        json["actionNumber"] as number,
        json["target"] as Actor,
        json["position"] as number,
        json["newValue"] as number,
        json["change"] as number,
      );
    } else {
      console.error(`CAMeterChangedAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}