import { GenericScenarioData } from "./genericscenariodata";
import { ScenarioCommand } from "./scenariocommand";

export type FullElixirScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.FULL_ELIXIR,
}