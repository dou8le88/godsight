import { GenericScenarioData } from "./genericscenariodata";
import { GameElementValue } from "./mechanics/element";
import { ScenarioCommand } from "./scenariocommand";

export type BossHpScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.BOSS_HP,
  "pos": number,
  "attr": GameElementValue,
  "hp": number,
  "recast": number,
  "recastmax": number,
}