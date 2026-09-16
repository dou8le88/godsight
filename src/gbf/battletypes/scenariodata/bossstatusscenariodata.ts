import { GenericScenarioData } from "./genericscenariodata";
import { GameElementValue } from "./mechanics/element";
import { ScenarioCommand } from "./scenariocommand";

export interface BossStatusScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.BOSS_STATUS,
  "name": {
    "en": string,
  },
  "pos": number,
  "attr": GameElementValue,
  "hp": number,
  "recast": number,
  "recastmax": number,
}