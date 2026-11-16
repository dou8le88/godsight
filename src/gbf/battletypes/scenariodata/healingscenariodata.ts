import { ScenarioData } from './scenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const GbfHealingInstance = z.object({
  /**
   * The position of the healing recipient.
   */
  'pos': z.coerce.number(),
  /**
   * The amount healed.
   */
  'value': z.coerce.number(),
  /**
   * The character's HP after the healing instance.
   */
  'hp': z.coerce.number(),
});

export const HealingScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.HEALING),
  'to': z.enum(Actor),
  'list': z.array(GbfHealingInstance),
}).strip();
