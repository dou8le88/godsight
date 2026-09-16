import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";


export interface ScreenEffectScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand._SCREEN_EFFECT,
  "name": string,
  "is_fatal_chain"?: boolean,
}