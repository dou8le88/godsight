import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class CAMeterChangedAction extends BattleAction {
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

  getSubactions(): BattleAction[] {
    return [];
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }
}