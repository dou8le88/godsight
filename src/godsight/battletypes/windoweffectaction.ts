import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class WindowEffectAction extends BattleAction {
  constructor(
    public actionNumber: number,
    public name: string,
  ) {
    super();
  }

  getDescription(): string {
    return `Window effect ${this.name} was activated!`;
  }

  getSubactions(): BattleAction[] {
    return [];
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }
}