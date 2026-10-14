import { GenericScenarioData } from './genericscenariodata';
import { ScenarioCommand } from './scenariocommand';

export interface RetreatScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.RETREAT;
  'next_url': string; //"#result\/2023338676",
  'is_aborted': boolean;
}
