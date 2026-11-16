import { ScenarioData } from './scenariodata';
import { MultiLanguageStringSchema } from './multilanguagestring';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const BattleLogScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand._BATTLE_LOG),
  'body': z.union([z.string(), MultiLanguageStringSchema]),
}).strip();
