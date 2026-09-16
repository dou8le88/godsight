import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export interface OmenCancelScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.OMEN_CANCEL,
  "pos": number,
}