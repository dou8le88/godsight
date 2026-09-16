import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { StatsUpdate } from "./stats";

export abstract class BattleAction {
  abstract actionType: ActionType;
  abstract actionNumber: number;
  abstract subactions: BattleAction[];

  abstract getStats(): StatsUpdate;

  abstract getDescription(): JSX.Element;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromJSON(json: Record<string, unknown>): BattleAction | undefined {
    throw new Error("BattleAction subclasses must implement a `static fromJSON` method!");
  }
}