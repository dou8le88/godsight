import { GenericScenarioData } from "./genericscenariodata";
import { Actor } from "./mechanics/actor";
import { ScenarioCommand } from "./scenariocommand";

export type GbfHealingInstance = {
  /**
   * The position of the healing recipient.
   */
  "pos": number,
  /**
   * The amount healed.
   */
  "value": number,
  /**
   * The character's HP after the healing instance.
   */
  "hp": number,
}

export type HealingScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.HEALING,
  "to": Actor,
  "list": GbfHealingInstance[],
  //"kind": "ab_3000",
}