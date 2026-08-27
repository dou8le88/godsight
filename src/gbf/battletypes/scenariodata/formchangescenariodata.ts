import { GenericScenarioData } from "./genericscenariodata";
import { GameElementValue } from "./mechanics/element";
import { Target } from "./mechanics/target";
import { ScenarioCommand } from "./scenariocommand";

/**
 * TODO: check this in Hexa, PBHL, other raids that change name/element.
 * It also has a target field, so it can perhaps be used for player characters that change sprites?
 * Frontline replacement like freezie?
 */
export type FormChangeScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.FORM_CHANGE,
  "param": {
    "attr": GameElementValue,
    "name": {
      "en": string,
    },
  }
  "pos": number,
  "to": Target.BOSS,
}