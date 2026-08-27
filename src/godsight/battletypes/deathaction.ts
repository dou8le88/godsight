import { Target } from "../../gbf/battletypes/scenariodata/mechanics/target";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";

export type DeathAction = BattleAction & {
  "action": ActionType.DEATH,
  "target": Target,
  "position": number,
  "index": number | undefined,
}