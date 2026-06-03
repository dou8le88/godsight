import { ScenarioCommand } from "./scenariocommand";
import { GenericScenarioData } from "./genericscenariodata";

export type AbilityScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.ABILITY,
  /**
   * TODO: If empty string, fall back on something generic like "Bonus Effect",
   * or look back at the previous commands to see if we can be more specific.
   */
  "name": string,
  // "pos": number, // position of activator?
  // "num": number, // also position of activator?
}