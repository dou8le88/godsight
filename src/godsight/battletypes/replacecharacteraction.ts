import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class ReplaceCharacterAction implements BattleAction {
  constructor(
    public position: number,
    public newCharacter: number,
  ) {
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }
}