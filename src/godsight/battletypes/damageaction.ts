import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { Target } from "../../gbf/battletypes/scenariodata/mechanics/target";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";

export type DamageAction = BattleAction & {
  "action": ActionType.DAMAGE_DEALT,
  "element": GameElementValue,
  "target": Target,
  "instances": DamageInstance[],
}