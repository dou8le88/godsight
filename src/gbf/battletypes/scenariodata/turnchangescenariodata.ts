import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export type TurnChangeScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.TURN_CHANGE,
  "turn": number,
}