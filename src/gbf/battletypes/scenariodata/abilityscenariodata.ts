import { ScenarioCommand } from "./scenariocommand";
import { GenericScenarioData } from "./genericscenariodata";
import { Target } from "./mechanics/target";

export type AbilityScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.ABILITY,
  "name": string,
  "pos": number,
  /**
   * Despite the field name, it's the entity activating the ability.
   */
  "to": Target,
}