import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export type PotionsChangedScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand._POTIONS_CHANGED,
  "small": string | number,
  "large": string | number,
}