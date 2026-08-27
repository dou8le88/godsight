import { StatusType } from "../../gbf/battletypes/scenariodata/mechanics/statustype";
import { Target } from "../../gbf/battletypes/scenariodata/mechanics/target";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";

export type ConditionChangeAction = BattleAction & {
  "action": ActionType.CONDITION_CHANGED,
  "target": Target,
  "position": number,
  "buffs": GodsightCondition[],
  "debuffs": GodsightCondition[],
  "unclassified": GodsightCondition[],
}

export type GodsightCondition = {
  "type": StatusType,
  "name": string,
  "icon": string,
}