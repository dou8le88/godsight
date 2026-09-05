import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export type OmenCancelScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.OMEN_CANCEL,
  "pos": number,
}