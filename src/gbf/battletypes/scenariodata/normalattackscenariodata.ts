import { GenericScenarioData } from "./genericscenariodata"
import { GameElementValue } from "./mechanics/element"
import { AttackAccuracyResult } from "./mechanics/attackaccuracyresult"
import { Actor } from "./mechanics/actor"
import { ScenarioCommand } from "./scenariocommand"


export interface NormalAttackScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.NORMAL_ATTACK,
  "from": Actor,
  "pos": number,
  "num": number,
  "color": GameElementValue,
  "total_attack_num": number,
  "damage": NormalAttackDamage[][] | Record<string, NormalAttackDamage[]>,
  "is_all_attack": boolean,
}

export interface NormalAttackDamage {
  "attack_count": number,
  "concurrent_attack_count": number,
  "pos": number,
  "value": number,
  /**
   * Target HP after receiving this damage.
   */
  "hp": number,
  "critical": boolean,
  /**
   * TODO: Expanded boolean with 0/1/2, for different types of missing?
   */
  "miss": AttackAccuracyResult,
  "color": GameElementValue,
  "guard": boolean
}
