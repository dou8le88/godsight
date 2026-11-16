import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const RetreatScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.RETREAT),
  /**
   * // Like "#result\/123456"
   */
  'next_url': z.string(),
  'is_aborted': z.coerce.boolean(),
}).strip();
