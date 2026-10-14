import { GenericScenarioData } from './genericscenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';

export interface HPChangedScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand._HP_CHANGED;
  'to': Actor;
  'pos': number;
  /**
   * Current HP.
   */
  'value': number;
  /**
   * Max HP.
   */
  'max': number;
}
