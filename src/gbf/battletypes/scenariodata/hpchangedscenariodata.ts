import { ScenarioData } from './scenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const HPChangedScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.HP_CHANGED),
  'to': z.enum(Actor),
  'pos': z.coerce.number(),
  /**
   * Current HP.
   */
  'value': z.coerce.number(),
  /**
   * Max HP.
   */
  'max': z.coerce.number(),
}).strip();
