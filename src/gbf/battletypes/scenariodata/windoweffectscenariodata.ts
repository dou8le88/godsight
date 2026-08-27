import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export type WindowEffectScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.WINDOW_EFFECT,
  "name": string,
}