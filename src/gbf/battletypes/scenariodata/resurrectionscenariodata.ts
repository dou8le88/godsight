import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export interface ResurrectionScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.RESURRECTION,
  "pos": number,
  "index": number,
  "performer": number,
  "name": string,
  "hpmax": number,
}