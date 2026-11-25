import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const ReviveItemScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.REVIVE_ITEM),
  'is_revival': z.union([z.stringbool(), z.boolean()]).optional(),
  'hp': z.array(z.coerce.number()).optional(),
}).strip();
