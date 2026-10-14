import { GenericScenarioData } from './genericscenariodata';
import { ScenarioCommand } from './scenariocommand';

export interface WindowEffectScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.WINDOW_EFFECT;
  'name': string;
}
