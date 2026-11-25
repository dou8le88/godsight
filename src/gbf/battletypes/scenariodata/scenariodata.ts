import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const ScenarioData = z.looseObject({
  'cmd': z.union([z.enum(ScenarioCommand), z.string()]),
});

export type Scenario = z.infer<typeof ScenarioData>;
