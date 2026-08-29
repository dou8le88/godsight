import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class CAMeterChangedAction implements BattleAction {
  constructor(
    public target: Actor,
    public position: number,
    public newValue: number,
    public change: number,
  ) {
  }
  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }
}