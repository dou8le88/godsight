import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export interface FatedChainGaugeScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.FATED_CHAIN_GAUGE_CHANGE,
  "value": number,
}