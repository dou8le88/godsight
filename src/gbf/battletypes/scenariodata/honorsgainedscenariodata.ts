import { ScenarioCommand } from './scenariocommand';
import { GenericScenarioData } from './genericscenariodata';

export interface HonorsGainedScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.HONORS_GAINED;
  'amount': number;
}
