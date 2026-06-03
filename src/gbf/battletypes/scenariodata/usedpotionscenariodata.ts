import { GenericScenarioData } from "./genericscenariodata";
import { Target } from "./mechanics/target";
import { ScenarioCommand } from "./scenariocommand";

export type HealingInstance = {
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
  "to": Target,
  "list": HealingInstance[],
  //"kind": "ab_3000",
}