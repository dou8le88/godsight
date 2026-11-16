import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const ReplaceCharacterScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.REPLACE_CHARACTER),
  'pos': z.coerce.number(),
  'npc': z.coerce.number(),
}).strip();
