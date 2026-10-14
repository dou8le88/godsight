import { GenericScenarioData } from './genericscenariodata';
import { ScenarioCommand } from './scenariocommand';

export interface ReplaceCharacterScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.REPLACE_CHARACTER;
  'pos': number;
  'npc': string;
}
