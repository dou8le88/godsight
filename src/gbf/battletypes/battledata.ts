import { z } from 'zod';
import { ScenarioList } from './scenariolist';

export const GroupGaugeStatus = z.object({
  'value': z.coerce.number(),
  'ability_available': z.coerce.boolean(),
});

export const SummonData = z.object({
  'skill': z.string(),
  'comment': z.string(),
  /**
   * Summon cooldown.
   */
  'recast': z.coerce.number(),
});

export const BattleStatus = z.object({
  'turn': z.coerce.number(),
  'timer': z.coerce.number(),
  /**
   * Number of skill button presses in battle.
   * Increments every time a character skill is used via pressing its button.
   * Not present in solo battles.
   */
  'ability_turn': z.optional(z.coerce.number()),
  'group_gauge': z.optional(GroupGaugeStatus),
  'summon': z.array(SummonData),
  'supporter': z.optional(
    z.object({
      'recast': z.coerce.number(),
    }),
  ),
});

export const GranblueBattleData = z.object({
  'scenario': ScenarioList,
  'status': z.optional(BattleStatus),
});

export type GranblueBattleData = z.infer<typeof GranblueBattleData>;
