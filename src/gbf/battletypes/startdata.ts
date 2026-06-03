import { ConditionSummary } from "./scenariodata/conditionchangedscenariodata"
import { GameElement, GameElementValue, PrettyElementName } from "./scenariodata/mechanics/element"
import { Proficiency } from "./scenariodata/mechanics/proficiency"

/**
 * The data received upon loading into a battle.
 * This includes both starting a battle and refreshing it.
 */
export type StartData = {
  "raid_id": number,
  "quest_id": string,
  "is_coopraid": boolean,
  "is_host": boolean,
  "turn": number,
  /**
   * TODO: what is this?
   */
  "ability_turn": number,
  /**
   * TODO: Numerical boolean (0/1) for whether or not it's multiplayer?
   */
  "multi": number,
  "battle": WaveData,
  /**
   * At battle start, seems to just be ["0", "1", "2", "3"].
   * TODO: Current party positions compared to the initial layout?
   */
  "formation": string[],
  /**
   * At battle start, seems to just be ["4", "5"]. Presumably more for Unlimited raids.
   * TODO: Current backline positions compared to the initial layout?
   */
  "back_formation": string[],
  "player": PartyFormationData,
  "boss": BossFormationData,
  /**
   * TODO: redundant in practice since all non-story battles have MC?
   */
  "nickname": string,
}

export type WaveData = {
  "total": number,
  "count": number,
  "wave_progress_min": number,
  "wave_progress_max": number,
}

export type PartyFormationData = {
  "type": "player", //always?
  /**
   * TODO: check if actually the total quantity of party members
   */
  "number": number,
  "param": PartyMemberData[],
}

export type PartyMemberData = {
  "name": string,
  /**
   * Character ID. For MC, it's `1` regardless of class.
   * For characters, it's a numerical string (`"123456"`).
   */
  "setting_id": number | string,
  /**
   * TODO: Some kind of portrait ID. Changes with MC's class/skin, might change with character skins?
   */
  "pid": string,
  /**
   * Actual portrait filename to be used in the URL.
   */
  "pid_image": string,
  "hpmax": number,
  "hp": number,
  /**
   * CA/ougi meter.
   */
  "recast": number,
  /**
   * TODO: Numerical boolean (0/1) for if the character is danchou?
   */
  "leader": number,
  /**
   * Max CA/ougi meter.
   */
  "recastmax": "100",
  "attr": GameElementValue,
  "weapon": Proficiency[],
  /**
   * Numerical boolean (0/1).
   */
  "alive": number,
  "condition": ConditionSummary,
  // "extra_attr": 0,
  // "form": 0,
  // "type": "s",
  "resurrection_availble_flag": boolean,
  // "special_skill_recast": "100",
  // "special_skill_activate_flag": boolean,
  /**
   * String of numerical boolean ("0"/"1") reeee
   */
  "is_guard_status": string,
  /**
   * String of numerical boolean ("0"/"1") reeee
   */
  "is_guard_unavailable": string,
  /**
   * Numerical boolean (0/1) reeee
   */
  "is_vanished": 0
}

export type BossFormationData = {
  /**
   * TODO: Numeric string?
   */
  "type": string,
  /**
   * TODO: is this boss target count?
   */
  "number": number,
  /**
   * TODO: numeric string boolean?
   */
  "modechange": "1",
  "modegauge": number,
  /**
   * TODO: Difficulty, I guess?
   */
  "star": number,
  "param": BossData[],
}

export type BossData = {
  /**
   * TODO: Numeric string?
   */
  "type": string,
  /**
   * TODO: Sprite or portrait data?
   */
  "cjs": string,
  "number": number,
  "hpmax": number,
  /**
   * Numeric string...
   */
  "hp": string,
  /**
   * Charge Diamonds
   */
  "recast": "3",
  /**
   * Max Charge Diamonds.
   */
  "recastmax": "3",
  "attr": GameElementValue,
  "effect": "ehit_9102883",
  /**
   * Numeric boolean (0/1).
   */
  "alive": number,
  "modechange": string,
  "modegauge": number,
  "modeflag": number,
  "enemy_id": string,
  "form": number,
  "gauge_group": number,
  /**
   * Numeric boolean (0/1).
   */
  "is_key_enemy": number,
  /**
   * Effectively the real name field.
   */
  "monster": string,
  "Lv": string,
  "attribute": PrettyElementName,
  /**
   * TODO: what?
   */
  "tribe": string,
  "condition": ConditionSummary,
}