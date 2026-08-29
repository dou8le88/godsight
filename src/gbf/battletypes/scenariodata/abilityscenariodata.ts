import { ScenarioCommand } from "./scenariocommand";
import { GenericScenarioData } from "./genericscenariodata";
import { Actor } from "./mechanics/actor";

export type AbilityScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.ABILITY,
  "name": string,
  "pos": number,
  /**
   * Despite the field name, it's the entity activating the ability.
   */
  "to": Actor,
}