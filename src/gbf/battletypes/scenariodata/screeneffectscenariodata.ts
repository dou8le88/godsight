import { ScenarioData } from './scenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const ScreenEffectScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand._SCREEN_EFFECT),
  'name': z.string(),
  'to': z.optional(z.enum(Actor)),
  'is_fatal_chain': z.optional(z.coerce.boolean()),
}).strip();

export type ScreenEffectScenarioData = z.infer<typeof ScreenEffectScenarioData>;
