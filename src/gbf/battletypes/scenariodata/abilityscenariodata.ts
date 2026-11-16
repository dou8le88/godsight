import { ScenarioCommand } from './scenariocommand';
import { ScenarioData } from './scenariodata';
import { Actor } from './mechanics/actor';
import { z } from 'zod';

export enum AbilityMotion {
  ON = 'on',
  OFF = 'off',
}

export const AbilityScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.ABILITY),
  'name': z.string(),
  'pos': z.coerce.number(),
  /**
   * Despite the field name, it's frequently the entity activating the ability.
   * It's more of "this is the entity who should visually act when this ability activates".
   */
  'to': z.enum(Actor),
  'motion': z.enum(AbilityMotion),
}).strip();
