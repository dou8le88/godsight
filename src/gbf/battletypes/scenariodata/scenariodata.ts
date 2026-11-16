import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const ScenarioData = z.looseObject({
  'cmd': z.enum(ScenarioCommand),
});

export type Scenario = z.infer<typeof ScenarioData>;
