import { BattleStatus, GranblueBattleData } from './battledata';
import { GameElementSchema } from './scenariodata/mechanics/element';
import { z } from 'zod';
import { MultiLanguageStringSchema } from './scenariodata/multilanguagestring';
import { ScenarioList } from './scenariolist';

export const StartSummonData = z.object({
  'id': z.coerce.string(),
  'name': z.string(),
  'attribute': GameElementSchema,
  /**
   * Summon call name.
   */
  'skill': z.string(),
  /**
   * Summon call description.
   */
  'comment': z.string(),
  /**
   * Current CD.
   * E.g., 3 is 3t, 0 is off CD.
   */
  'recast': z.coerce.number(),
  /**
   * Inherent summon ICD at battle start.
   * Note that element-matching summon ICDs are shortened by 3t in gameplay,
   * and main/friend summons start off CD.
   * No ICD is represented by the empty string "", coerced to 0 by zod.
   */
  'start_recast': z.coerce.number(),
  /**
   * Summon base "cooldown".
   * Usually means the summon's own cooldown, but for some summons that
   * can't be recast but trigger a recurring effect (e.g., Belial), it
   * can be used to represent that cooldown.
   */
  'require': z.coerce.number(),
  /**
   * Summon aura or subaura name.
   */
  'protection_name': z.string(),
  /**
   * Summon aura or subaura description.
   */
  'protection': z.string(),
});

export const WaveData = z.object({
  'total': z.coerce.number(),
  'count': z.coerce.number(),
  'wave_progress_min': z.coerce.number(),
  'wave_progress_max': z.coerce.number(),
});

export const PartyMemberData = z.object({
  'name': z.string(),
  /**
   * Character ID. For MC, it's 1 regardless of class.
   * For characters, it's their character ID.
   */
  'setting_id': z.coerce.string(),
  /**
   * Some kind of portrait ID. Changes with MC's class/skin, might change with character skins?
   */
  'pid': z.string(),
  /**
   * Actual portrait filename to be used in the URL.
   */
  'pid_image': z.string(),
  'hpmax': z.coerce.number(),
  'hp': z.coerce.number(),
  'leader': z.coerce.boolean(),
  /**
   * CA/ougi meter.
   */
  'recast': z.coerce.number(),
  /**
   * Max CA/ougi meter.
   */
  'recastmax': z.coerce.number(),
  'attr': GameElementSchema,
  'alive': z.coerce.boolean(),
  'resurrection_availble_flag': z.coerce.boolean(),
  'is_vanished': z.coerce.boolean().optional(),
  'special_skill': z.string(),
  'special_comment': z.string(),
});

export type PartyMemberData = z.infer<typeof PartyMemberData>;

export const PartyFormationData = z.object({
  'type': z.literal('player'), //always?
  'number': z.coerce.number(),
  'param': z.array(PartyMemberData),
});

export const BossData = z.object({
  'type': z.string(),
  'cjs': z.string(),
  'number': z.coerce.number(),
  'hpmax': z.coerce.number(),
  'hp': z.coerce.number(),
  /**
   * Charge Diamonds
   */
  'recast': z.coerce.number(),
  /**
   * Max Charge Diamonds.
   */
  'recastmax': z.coerce.number(),
  'attr': GameElementSchema,
  'alive': z.coerce.boolean(),
  'enemy_id': z.string(),
  'form': z.coerce.number(),
  'is_key_enemy': z.coerce.boolean(),
  'name': MultiLanguageStringSchema,
  'Lv': z.coerce.number(),
  'attribute': z.string(),
});

export type BossData = z.infer<typeof BossData>;

export const BossFormationData = z.object({
  'type': z.string(),
  'number': z.coerce.number(),
  'param': z.array(BossData),
});

/**
 * The data received upon loading into a battle.
 * This includes both starting a battle and refreshing it.
 */
export const StartData = GranblueBattleData.extend({
  'raid_id': z.coerce.number(),
  'quest_id': z.coerce.number(),
  /**
   * In seconds till the timer expires.
   */
  'timer': z.coerce.number(),
  'turn': z.coerce.number(),
  'multi': z.coerce.number(),
  'battle': WaveData,
  /**
   * Current player layout compared to `"player"` party formation, as indices.
   *
   * E.g., `["0", "1", "2", "3"]` at battle start.
   * If `"3"` dies, then `["0", "1", "2", "4"]`.
   */
  'formation': z.array(z.coerce.number()),
  /**
   * Backline formation, see `"formation"`.
   */
  'back_formation': z.array(z.coerce.number()),
  /**
   * Base ordering of units in this party.
   */
  'player': PartyFormationData,
  'boss': BossFormationData,
  'nickname': z.string(),
  /**
   * Only populated if the boss has an opening action, and only on the initial start.json.
   * Battle refreshes will show an empty scenario.
   */
  'scenario': ScenarioList,
  /**
   * Lyria's party index.
   */
  'lyria_num': z.coerce.number(),
  'summon': z.array(StartSummonData),
  'supporter': z.nullable(StartSummonData),
  'status': z.optional(BattleStatus),
  'chain_burst_gauge': z.optional(z.coerce.number()),

  /** Tower of Babyl extra parties */
  'tower_party': z.optional(
    z.object({
      'param': z.record(
        z.coerce.number(),
        z.record(z.coerce.number(), PartyMemberData).and(
          z.object({
            'can_party_change': z.coerce.boolean(),
          }),
        ),
      ),
    }),
  ),
  'tower_front_party_num': z.optional(z.coerce.number()),
  'tower_formation': z.optional(
    z.record(z.coerce.number(), z.array(z.coerce.number())),
  ),
});

export type StartData = z.infer<typeof StartData>;
