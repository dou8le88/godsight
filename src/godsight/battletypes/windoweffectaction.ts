import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";

export type WindowEffectAction = BattleAction & {
  "action": ActionType.WINDOW_EFFECT,
  "name": string,
}