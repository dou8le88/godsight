export interface GodsightSettings {
  "mainCharacterNameOverride": string,
  "defaultBattleView": DefaultBattleView,
  "lastSelectedBattleView"?: BattleViewTab,
  "maxRememberedBattles": number,
  "damageDisplay": DamageDisplay,
}

export enum DefaultBattleView {
  LAST_SELECTION = "Last Selected",
  STATS = "Stats",
  TURN_ACTIONS = "Turn Actions",
}

export enum BattleViewTab {
  STATS,
  TURN_ACTIONS,
}

export enum DamageDisplay {
  SINGLE_NUMBER = "Single Number",
  ONE_PER_ELEMENT = "One per Element",
  ALL_HITS = "All Hits",
}

export const DefaultSettings: GodsightSettings = {
  "mainCharacterNameOverride": "MC",
  "defaultBattleView": DefaultBattleView.LAST_SELECTION,
  "maxRememberedBattles": 10,
  "damageDisplay": DamageDisplay.ONE_PER_ELEMENT,
};