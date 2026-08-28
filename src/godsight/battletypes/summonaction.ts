import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";

export type SummonAction = BattleAction & {
  "action": ActionType.CALLED_SUMMON,
  "name": string,
  "damageInstances": DamageInstance[],
  "subactions": BattleAction[],
}