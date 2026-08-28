import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { Target } from "../../gbf/battletypes/scenariodata/mechanics/target";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";

export type MultihitDamageAction = BattleAction & {
  "action": ActionType.DAMAGE_DEALT_MULTIHIT,
  "element": GameElementValue,
  "target": Target,
  "hits": DamageInstance[],
  "totals": number[],
}