import { BattleStatus, GranblueBattleData } from './battledata';
import { ConditionSummary } from './scenariodata/conditionchangedscenariodata';
import { GenericScenarioData } from './scenariodata/genericscenariodata';
import {
  GameElementValue,
  PrettyElementName,
} from './scenariodata/mechanics/element';
import { Proficiency } from './scenariodata/mechanics/proficiency';

/**
 * The data received upon loading into a battle.
 * This includes both starting a battle and refreshing it.
 */
export type StartData = GranblueBattleData & {
  'raid_id': number;
  'quest_id': string;
  'is_coopraid': boolean;
  'is_host': boolean;
  /**
   * In seconds till the timer expires.
   */
  'timer': number;
  'turn': number;
  /**
   * Number of skill button presses in battle.
   * Increments every time a character skill is used via pressing its button.
   */
  'ability_turn': number;
  'multi': number;
  'battle': WaveData;
  /**
   * Current player layout compared to `"player"` party formation, as indices.
   *
   * E.g., `["0", "1", "2", "3"]` at battle start.
   * If `"3"` dies, then `["0", "1", "2", "4"]`.
   */
  'formation': string[];
  /**
   * Backline formation, see `"formation"`.
   */
  'back_formation': string[];
  /**
   * Base ordering of units in this party.
   */
  'player': PartyFormationData;
  'boss': BossFormationData;
  'nickname': string;
  /**
   * Only populated if the boss has an opening action, and only on the initial start.json.
   * Battle refreshes will show an empty scenario.
   */
  'scenario': GenericScenarioData[];
  'status'?: BattleStatus;
  'chain_burst_gauge'?: string;

  /** Tower of Babyl extra parties */
  'tower_party'?: {
    'param': Record<string | number, Record<string | number, PartyMemberData>>;
  };
  'tower_front_party_num'?: number;
};

export interface WaveData {
  'total': number;
  'count': number;
  'wave_progress_min': number;
  'wave_progress_max': number;
}

export interface PartyFormationData {
  'type': 'player'; //always?
  'number': number;
  'param': PartyMemberData[];
}

export interface PartyMemberData {
  'name': string;
  /**
   * Character ID. For MC, it's `1` regardless of class.
   * For characters, it's a numerical string (`"123456"`).
   */
  'setting_id': number | string;
  /**
   * Some kind of portrait ID. Changes with MC's class/skin, might change with character skins?
   */
  'pid': string;
  /**
   * Actual portrait filename to be used in the URL.
   */
  'pid_image': string;
  'hpmax': number;
  'hp': number;
  'leader': number;
  /**
   * CA/ougi meter.
   */
  'recast': number;
  /**
   * Max CA/ougi meter.
   */
  'recastmax': string;
  'attr': GameElementValue;
  'weapon': Proficiency[];
  /**
   * Numerical boolean (0/1).
   */
  'alive': number;
  'condition': ConditionSummary;
  // "extra_attr": 0,
  // "form": 0,
  // "type": "s",
  'resurrection_availble_flag': boolean;
  // "special_skill_recast": "100",
  // "special_skill_activate_flag": boolean,
  /**
   * String of numerical boolean ("0"/"1") reeee
   */
  'is_guard_status': string;
  /**
   * String of numerical boolean ("0"/"1") reeee
   */
  'is_guard_unavailable': string;
  /**
   * Numerical boolean (0/1) reeee
   */
  'is_vanished': number;
}

export interface BossFormationData {
  'type': string;
  'number': number;
  'modechange': string | number;
  'modegauge': number;
  /**
   * Difficulty in number of stars in the raid host UI.
   */
  'star': number;
  'param': BossData[];
}

export interface BossData {
  'type': string;
  'cjs': string;
  'number': number;
  'hpmax': number;
  /**
   * HP as a numeric string...
   */
  'hp': string;
  /**
   * Charge Diamonds
   */
  'recast': string;
  /**
   * Max Charge Diamonds.
   */
  'recastmax': string;
  'attr': GameElementValue;
  /**
   * Numeric boolean (0/1).
   */
  'alive': number;
  'modechange': string;
  'modegauge': number;
  'modeflag': number;
  'enemy_id': string;
  'form': number;
  'gauge_group': number;
  /**
   * Numeric boolean (0/1).
   */
  'is_key_enemy': number;
  'name': {
    'en': string;
  };
  'Lv': string;
  'attribute': PrettyElementName;
  /**
   * Enemy type (e.g., "Ooze").
   * Think this is used for trophies that want you to kill a gorillion slimes/crabs/etc.
   */
  'tribe': string;
  'condition': ConditionSummary;
}
