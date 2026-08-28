import { Target } from "../../gbf/battletypes/scenariodata/mechanics/target";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { HealingInstance } from "./healinginstance";

export type HealingAction = BattleAction & {
  "action": ActionType.HEAL,
  "target": Target,
  "healingInstances": HealingInstance[],
}