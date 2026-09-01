import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class DeathAction extends BattleAction {
  constructor(
    public actionNumber: number,
    public target: Actor,
    public position: number,
    public index: number | undefined,
  ) {
    super();
  }

  getDescription(): string {
    return `${this.target} at position ${this.position} was knocked out!`;
  }

  getSubactions(): BattleAction[] {
    return [];
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }
}