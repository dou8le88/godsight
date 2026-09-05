import { BattleAction } from "./battleaction";
import { Stats } from "./stats";

export type TurnData = {
  "turnStats": Stats,
  "characterCurrentTurnStats": { [key: string | number]: Stats },
  "turnActions": BattleAction[],
}