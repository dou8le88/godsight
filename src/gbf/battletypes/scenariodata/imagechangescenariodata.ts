import { GenericScenarioData } from './genericscenariodata';
import { ScenarioCommand } from './scenariocommand';

export interface ImageChangeScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.IMAGE_CHANGE;
  'pos': number;
  'image_id': string;
}
