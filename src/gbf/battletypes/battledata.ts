import { CharacterType } from "./scenariodata/mechanics/charactertype"
import { GuardStatus } from "./scenariodata/mechanics/guardstatus"
import { GenericScenarioData } from "./scenariodata/genericscenariodata"

export interface CharacterAbilityStatus {
  "mode": CharacterType,
  "pos": number,
  "alive": number,
  "src": string,
}

/**
 * Seems to be only the frontline? Mostly focused on ability availability,
 * probably used for displaying ability and CD information.
 */
export type PartyAbilityStatus = Record<string, CharacterAbilityStatus>;

export interface GroupGaugeStatus {
  "value": number,
  "ability_available": boolean,
}

export interface BattleStatus {
  "raid_id": number,
  "turn": number,
  "timer": number,
  /**
   * Number of skill button presses in battle.
   * Increments every time a character skill is used via pressing its button.
   */
  "ability_turn": number,
  "is_guard_status": GuardStatus[],
  "ability": PartyAbilityStatus,
  // "lyria_pos": number,
  "group_gauge": GroupGaugeStatus,
  "summon": SummonData[],
}

export interface SummonData {
  "skill": string,
  "comment": string,
}

export interface GranblueBattleData {
  "scenario": GenericScenarioData[],
  "status": BattleStatus,
}