import { GenericScenarioData } from "./genericscenariodata";
import { Actor } from "./mechanics/actor";
import { ScenarioCommand } from "./scenariocommand";

export type DeathScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.DEATH,
  "to": Actor,
  "pos": number,
  "index": number | null | undefined,
  // "chain": 0,
}