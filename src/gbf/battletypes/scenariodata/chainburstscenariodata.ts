import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";


export type ChainBurstScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.CHAIN_BURST,
  "name": string,
  "is_fatal_chain"?: boolean,
}