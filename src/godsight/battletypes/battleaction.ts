import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { StatsUpdate } from "./stats";

export abstract class BattleAction {
  abstract actionType: ActionType;
  abstract subactions: BattleAction[];

  abstract getStats(): StatsUpdate;

  abstract getDescription(key: number): JSX.Element;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromJSON(json: Record<string, unknown>): BattleAction | undefined {
    throw new Error("BattleAction subclasses must implement a `static fromJSON` method!");
  }
}