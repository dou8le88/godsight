import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";

export type NormalAttackAction = BattleAction & {
  "action": ActionType.NORMAL_ATTACK,
  "subactions": BattleAction[],
}