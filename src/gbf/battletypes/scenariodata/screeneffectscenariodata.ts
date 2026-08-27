import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";


export type ScreenEffectScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.SCREEN_EFFECT,
  "name": string,
  "is_fatal_chain"?: boolean,
}