import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class ReplaceCharacterAction extends BattleAction {
  constructor(
    public actionNumber: number,
    public position: number,
    public newCharacter: number,
  ) {
    super();
  }

  getDescription(): string {
    return `Character at position ${this.position} was replaced with ${this.newCharacter}!`;
  }

  getSubactions(): BattleAction[] {
    return [];
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }
}