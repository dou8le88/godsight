import { ScenarioCommand } from './scenariocommand';
import { GenericScenarioData } from './genericscenariodata';
import { Actor } from './mechanics/actor';

export interface AbilityScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.ABILITY;
  'name': string;
  'pos': number;
  /**
   * Despite the field name, it's frequently the entity activating the ability.
   * It's more of "this is the entity who should visually act when this ability activates".
   */
  'to': Actor;
  'motion': AbilityMotion;
}

export enum AbilityMotion {
  ON = 'on',
  OFF = 'off',
}
