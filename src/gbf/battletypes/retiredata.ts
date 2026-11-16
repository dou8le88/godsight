import { RetreatScenarioData } from './scenariodata/retreatscenariodata';
import { z } from 'zod';

export const RetreatData = z.object({
  'scenario': z.array(RetreatScenarioData),
});
