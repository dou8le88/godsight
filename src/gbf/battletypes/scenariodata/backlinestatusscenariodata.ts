import { ScenarioData } from './scenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const BacklineStatusScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.BACKLINE_STATUS),
  'to': z.enum(Actor),
  /**
   * Character index in ['party']['members'] rather than formation position.
   */
  'num': z.coerce.number(),
  /**
   * Assuming this command could be used to adjust other fields besides
   * HP, so preemptively typing param subfields as optional.
   */
  'param': z.object({
    'hp': z.optional(z.coerce.number()),
    'hpmax': z.optional(z.coerce.number()),
  }),
}).strip();
