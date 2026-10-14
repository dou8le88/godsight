import { GenericScenarioData } from './genericscenariodata';
import { ScenarioCommand } from './scenariocommand';

export interface TurnChangeScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.TURN_CHANGE;
  'turn': number | string;
}
