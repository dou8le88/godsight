import { GenericScenarioData } from './genericscenariodata';
import { GameElementValue } from './mechanics/element';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';

export interface FormChangeScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.FORM_CHANGE;
  'param': {
    'attr': GameElementValue;
    'name': {
      'en': string;
      'ja': string;
    };
  };
  'pos': number;
  'to': Actor;
}
