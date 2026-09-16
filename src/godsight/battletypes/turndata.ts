import { BattleAction } from "./battleaction";
import { Stats } from "./stats";

export interface TurnData {
  "turnStats": Stats,
  "characterCurrentTurnStats": Record<string | number, Stats>,
  "turnActions": BattleAction[],
}