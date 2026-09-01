import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class FullElixirAction extends BattleAction {
  constructor(
    public actionNumber: number,
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(): string {
    return `The party used a Full Elixir!`;
  }

  getSubactions(): BattleAction[] {
    return this.subactions;
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();
    const subactionUpdates = this.subactions.map(action => action.getStats());

    return subactionUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update
    );
  }
}