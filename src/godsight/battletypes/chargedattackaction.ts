import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { Target } from "../../gbf/battletypes/scenariodata/mechanics/target";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";

export type ChargedAttackAction = BattleAction & {
  "action": ActionType.CHARGED_ATTACK,
  "name": string,
  "position": number,
  "targetPosition": number,
  "target": Target,
  "element": GameElementValue,
  "damageTotals": DamageInstance[],
  "subactions": BattleAction[],
}