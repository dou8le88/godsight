import { ScenarioData } from './scenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const ChargeAttackMeterChangedScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.CA_METER_CHANGED),
  'to': z.enum(Actor),
  'pos': z.coerce.number(),
  'value': z.coerce.number(),
  'max': z.coerce.number(),
}).strip();

export type ChargeAttackMeterChangedScenario = z.infer<
  typeof ChargeAttackMeterChangedScenarioData
>;
