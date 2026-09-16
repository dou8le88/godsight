import { GameElementValue } from "./mechanics/element";
import { ScenarioCommand } from "./scenariocommand";
import { GenericScenarioData } from "./genericscenariodata";

export interface SummonDamageInstance {
  "pos": number,
  "value": number,
  "hp": number,
  "critical": boolean,
  "guard": boolean,
  "color": GameElementValue
}

export interface SummonDamageDescription {
  "damage": SummonDamageInstance[]
}

export interface SummonScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.SUMMON,
  "name": string,
  "list": SummonDamageDescription[],
}