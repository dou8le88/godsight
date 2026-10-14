import { GenericScenarioData } from './genericscenariodata';
import { GameElementValue } from './mechanics/element';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';

/**
 * TODO: check this in Hexa, PBHL, other raids that change name/element.
 * It also has a target field, so it can perhaps be used for player characters that change sprites?
 * Frontline replacement like freezie?
 */
export interface FormChangeScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.FORM_CHANGE;
  'param': {
    'attr': GameElementValue;
    'name': {
      'en': string;
    };
  };
  'pos': number;
  'to': Actor.BOSS;
}
