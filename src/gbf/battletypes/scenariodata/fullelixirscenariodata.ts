import { GenericScenarioData } from './genericscenariodata';
import { ScenarioCommand } from './scenariocommand';

export interface FullElixirScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.FULL_ELIXIR;
}
