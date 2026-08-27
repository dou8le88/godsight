import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element"
import { Target } from "../../gbf/battletypes/scenariodata/mechanics/target"
import { ActionType } from "./actiontype"
import { BattleAction } from "./battleaction"
import { DamageInstance } from "./damageinstance"

export type BossSpecialAttackAction = BattleAction & {
  "action": ActionType.BOSS_SPECIAL_ATTACK,
  "name": string,
  "source": string,
  "target": Target,
  "count": number,
  /**
   * Useless since the damage instances have their element?
   */
  "element": GameElementValue,
  "damageInstances": DamageInstance[],
  "subactions": BattleAction[],
}
