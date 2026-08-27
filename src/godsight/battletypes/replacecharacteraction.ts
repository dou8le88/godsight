import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";

export type ReplaceCharacterAction = BattleAction & {
  "action": ActionType.REPLACED_CHARACTER,
  "position": number,
  "newCharacter": number,
}