import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export type FatedChainGaugeScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.FATED_CHAIN_GAUGE_CHANGE,
  "value": number,
}