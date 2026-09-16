import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export interface StandbyScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.STANDBY,
  "pos": number,
  "standby": boolean, // redundant?
}