import { GenericScenarioData } from './genericscenariodata';
import { ScenarioCommand } from './scenariocommand';

export interface BattleLogScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand._BATTLE_LOG;
  'body': string | { 'en': string };
}
