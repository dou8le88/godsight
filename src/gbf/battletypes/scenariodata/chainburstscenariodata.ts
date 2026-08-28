import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export type ChainBurstScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.CHAIN_BURST,
  "chain_num": number,
}