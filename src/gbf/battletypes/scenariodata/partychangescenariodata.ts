import { GenericScenarioData } from './genericscenariodata';
import { ScenarioCommand } from './scenariocommand';

export interface PartyChangeScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.PARTY_CHANGE;
  'main_party_num': number;
}
