import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";

export type ChainBurstAction = BattleAction & {
  "action": ActionType.CHAIN_BURST,
  "chainCount": number,
  "name": string,
  "damageInstances": DamageInstance[],
}