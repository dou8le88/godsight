import { GameElementValue } from "./mechanics/element";
import { ScenarioCommand } from "./scenariocommand";
import { GenericScenarioData } from "./genericscenariodata";

export type SummonDamageInstance = {
  "pos": number,
  "value": number,
  "hp": number,
  "critical": boolean,
  "guard": boolean,
  "color": GameElementValue
}

export type SummonDamageDescription = {
  "damage": SummonDamageInstance[]
}

export type SummonScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.SUMMON,
  "name": string,
  "list": SummonDamageDescription[],
}