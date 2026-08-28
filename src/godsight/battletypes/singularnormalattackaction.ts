import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { Target } from "../../gbf/battletypes/scenariodata/mechanics/target";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";

export type SingularNormalAttackAction = BattleAction & {
  "action": ActionType.SINGULAR_NORMAL_ATTACK,
  "from": Target,
  "attackerPosition": number,
  "targetPosition": number,
  "element": GameElementValue,
  "damage": DamageInstance[],
}