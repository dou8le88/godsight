import { GameElementSchema } from './mechanics/element';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { ScenarioData } from './scenariodata';
import { SkillOrDebuffDamageInstance } from './individualdamageinstance';
import { z } from 'zod';

export const DamageScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.DAMAGE_DEALT),
  'color': GameElementSchema,
  'to': z.enum(Actor),
  'list': z.array(SkillOrDebuffDamageInstance),
  'turn_end': z.optional(z.union([z.boolean(), z.stringbool()])),
}).strip();
