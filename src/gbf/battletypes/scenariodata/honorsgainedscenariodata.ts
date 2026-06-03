import { ScenarioCommand } from "./scenariocommand";
import { GenericScenarioData } from "./genericscenariodata";

export type HonorsGainedScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.HONORS_GAINED,
  "amount": number,
}
