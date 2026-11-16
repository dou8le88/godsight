import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const WonBattleScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.WON_BATTLE),
  'mode': z.coerce.number(),
  /**
   * Next wave's raid ID.
   */
  'raid_id': z.coerce.number(),
  'is_last_raid': z.coerce.boolean(),
}).strip();
