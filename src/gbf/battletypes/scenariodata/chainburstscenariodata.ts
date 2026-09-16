import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export interface ChainBurstScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.CHAIN_BURST,
  "chain_num": number,
}