import { GenericScenarioData } from './genericscenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';

export interface BacklineStatusScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.BACKLINE_STATUS;
  'to': Actor;
  /**
   * Character index in ['party']['members'] rather than formation position.
   */
  'num': number;
  /**
   * Assuming this command could be used to adjust other fields besides
   * HP, so preemptively typing param subfields as optional.
   */
  'param': {
    'hp'?: number;
    'hpmax'?: number;
  };
}
