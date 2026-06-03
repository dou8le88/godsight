import { CharacterType } from "./scenariodata/mechanics/charactertype"
import { GuardStatus } from "./scenariodata/mechanics/guardstatus"
import { GenericScenarioData } from "./scenariodata/genericscenariodata"

export type CharacterAbilityStatus = {
  "mode": CharacterType,
  "pos": number,
  "alive": number,
  "src": string,
}

/**
 * Seems to be only the frontline? Mostly focused on ability availability,
 * probably used for displaying ability and CD information.
 */
export type PartyAbilityStatus = {
  [key: string]: CharacterAbilityStatus,
}

export type GroupGaugeStatus = {
  "value": number,
  "ability_available": boolean,
}

export type BattleStatus = {
  "turn": number,
  "ability_turn": number,
  "is_guard_status": GuardStatus[],
  "chain_burst_gauge": string,
  "ability": PartyAbilityStatus,
  // "lyria_pos": number,
  "group_gauge": GroupGaugeStatus,
}

export type BattleData = {
  "scenario": GenericScenarioData[],
  "status": BattleStatus,
}