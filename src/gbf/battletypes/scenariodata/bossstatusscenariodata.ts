import { ScenarioData } from './scenariodata';
import { GameElementSchema } from './mechanics/element';
import { MultiLanguageStringSchema } from './multilanguagestring';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const BossStatusScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.BOSS_STATUS),
  'name': MultiLanguageStringSchema,
  'pos': z.coerce.number(),
  'attr': GameElementSchema,
  'hp': z.coerce.number(),
  'recast': z.coerce.number(),
  'recastmax': z.coerce.number(),
}).strip();

export type BossStatusScenario = z.infer<typeof BossStatusScenarioData>;
