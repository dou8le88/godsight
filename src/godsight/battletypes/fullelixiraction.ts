import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";

export type FullElixirAction = BattleAction & {
  "action": ActionType.USED_FULL_ELIXIR,
  "subactions": BattleAction[],
}