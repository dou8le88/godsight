import { GenericScenarioData } from "./genericscenariodata";
import { Actor } from "./mechanics/actor";
import { ScenarioCommand } from "./scenariocommand";

export interface GbfHealingInstance {
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

export interface HealingScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.HEALING,
  "to": Actor,
  "list": GbfHealingInstance[],
  //"kind": "ab_3000",
}