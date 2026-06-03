import { GenericScenarioData } from "./genericscenariodata";
import { GameElementValue } from "./mechanics/element";
import { AttackAccuracyResult } from "./mechanics/attackaccuracyresult";
import { Target } from "./mechanics/target";
import { ScenarioCommand } from "./scenariocommand";

export type BossSpecialAttackScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.BOSS_SPECIAL_ATTACK,
  "kind": "esp_9102883_04",
  "name": string,
  /**
   * Source of the special attack.
   */
  "pos": number,
  "num": number,
  "target": Target,
  "count": number,
  "attr": GameElementValue,
  "total": [],
  "list": BossSpecialAttackDamageSummary[]
}

export type BossSpecialAttackDamageSummary = {
  damage: BossSpecialAttackDamageInstance[],
}

export type BossSpecialAttackDamageInstance = {
  "attr": GameElementValue,
  "pos": number,
  /**
   * Amount of damage.
   */
  "value": number,
  /**
   * Character HP after taking damage.
   */
  "hp": number,
  "critical": boolean,
  /**
   * TODO: Expanded boolean with 0/1/2, for different types of missing?
   */
  "miss": AttackAccuracyResult,
  "guard": boolean,
}