import { GenericScenarioData } from "./genericscenariodata";
import { Target } from "./mechanics/target";
import { ScenarioCommand } from "./scenariocommand";

export type HPChangedScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand._HP_CHANGED,
  "to": Target,
  "pos": number,
  /**
   * Current HP.
   */
  "value": number,
  /**
   * Max HP.
   */
  "max": number,
}