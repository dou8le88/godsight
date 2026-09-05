import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export type StandbyScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.STANDBY,
  "pos": number,
  "standby": boolean, // redundant?
}