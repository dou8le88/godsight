import { Target } from "../../gbf/battletypes/scenariodata/mechanics/target";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";

export type AbilityAction = BattleAction & {
  "action": ActionType.ACTIVATED_ABILITY,
  "source": Target,
  "position": number,
  "name": string,
  "subactions": BattleAction[],
}