import { GenericScenarioData } from "./genericscenariodata";
import { Target } from "./mechanics/target";
import { ScenarioCommand } from "./scenariocommand";

export type DeathScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.DEATH,
  "to": Target,
  "pos": number,
  "index": number | null | undefined,
  // "chain": 0,
}