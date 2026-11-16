import { StatusType } from './mechanics/statustype';
import { ScenarioCommand } from './scenariocommand';
import { ScenarioData } from './scenariodata';
import { z } from 'zod';

export const AppliedStatus = z.object({
  /**
   * Party slot that received the status.
   */
  'pos': z.coerce.number(),
  'type': z.transform((val) => String(val) as StatusType),
  /**
   * Name of the buff or debuff.
   */
  'text': z.string(),
  /**
   * Status ID.
   */
  'status': z.coerce.string(),
  'miss': z.optional(z.coerce.number()),
  'dispel': z.optional(z.coerce.number()),
});

export type AppliedStatus = z.infer<typeof AppliedStatus>;

export const MessageData = z.object({
  'boss': z.optional(
    z.union([
      z.array(z.array(AppliedStatus)),
      z.record(z.coerce.number(), z.array(AppliedStatus)),
    ]),
  ),
  'player': z.optional(
    z.union([
      z.array(z.array(AppliedStatus)),
      z.record(z.coerce.number(), z.array(AppliedStatus)),
    ]),
  ),
});

export const MessageScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.MESSAGE),
  'data': MessageData,
}).strip();

export type MessageScenarioData = z.infer<typeof MessageScenarioData>;
