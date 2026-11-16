import { ScenarioData } from './scenariodata';
import { GameElementSchema } from './mechanics/element';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';
import { MultiLanguageStringSchema } from './multilanguagestring';

export const FormChangeScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.FORM_CHANGE),
  'param': z.object({
    'attr': GameElementSchema,
    'name': z.union([z.string(), MultiLanguageStringSchema]),
  }),
  'pos': z.coerce.number(),
  'to': z.enum(Actor),
}).strip();

export type FormChangeScenarioData = z.infer<typeof FormChangeScenarioData>;
