import { BattleAction } from "./battleaction";
import { Stats } from "./stats";

export interface TurnData {
  "turnStats": Stats,
  "beforeBossTurnStats": Stats,
  "characterCurrentTurnStats": Record<string | number, Stats>,
  "characterBeforeBossTurnStats": Record<string | number, Stats>,
  "turnActions": BattleAction[],
}