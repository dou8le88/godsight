import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined } from "../../util/assert";

export class CAMeterChangedAction extends BattleAction {
  public actionType: ActionType = ActionType.CA_METER_CHANGED;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public target: Actor,
    public targetName: string,
    public newValue: number,
    public change: number,
  ) {
    super();
  }

  getDescription(): JSX.Element {
    let changeWord = "";
    if (this.change > 0) {
      changeWord = "gained";
    } else {
      changeWord = "lost";
    }

    let meterWord = "meter";
    if (this.target == Actor.BOSS) {
      if (this.change > 1 || this.change < 1) {
        meterWord = "charge diamonds";
      } else {
        meterWord = "charge diamond";
      }
    } else if (this.target == Actor.PLAYER) {
      meterWord = "charge bar";
    }

    return (
      <div key={this.actionNumber} className="action-description">{this.targetName} {changeWord} {this.change} {meterWord}!
      </div>
    );
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  static fromJSON(json: { [key: string]: any; }): CAMeterChangedAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CA_METER_CHANGED) {
      return new CAMeterChangedAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["targetName"] as string),
        assertNotNullOrUndefined(json["newValue"] as number),
        assertNotNullOrUndefined(json["change"] as number),
      );
    } else {
      console.error(`CAMeterChangedAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}