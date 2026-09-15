import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export type ResurrectionScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.RESURRECTION,
  "pos": number,
  "index": number,
  "performer": number,
  "name": string,
  "hpmax": number,
}