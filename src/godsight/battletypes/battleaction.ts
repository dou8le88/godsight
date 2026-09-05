import { ActionType } from "./actiontype";
import { StatsUpdate } from "./stats";

export abstract class BattleAction {
  abstract actionType: ActionType;
  abstract actionNumber: number;
  abstract subactions: BattleAction[];

  abstract getStats(): StatsUpdate;

  abstract getDescription(): string;

  static fromJSON(json: { [key: string]: any; }): BattleAction | undefined {
    throw new Error("BattleAction subclasses must implement a `static fromJSON` method!");
  }
}