import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export type BattleLogScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand._BATTLE_LOG,
  "body": string,
}