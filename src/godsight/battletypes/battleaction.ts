import { StatsUpdate } from "./stats";

export abstract class BattleAction {
  public abstract actionNumber: number;

  abstract getStats(): StatsUpdate;

  abstract getDescription(): string;

  abstract getSubactions(): BattleAction[];
}