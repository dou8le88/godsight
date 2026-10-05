export interface GodsightSettings {
  "mainCharacterNameOverride": string,
  "defaultBattleView": DefaultBattleView,
  "lastSelectedBattleView"?: BattleViewTab,
  "maxRememberedBattles": number,
  "damageDisplay": DamageDisplay,
  "onRaidLoadBehavior": OnRaidLoadBehavior,
  "disableImageLoading": boolean,
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

export enum OnRaidLoadBehavior {
  SWITCH = "Switch to Raid",
  NOTIFY = "Notify",
  NO_ACTION = "No Action",
}

export const DefaultSettings: GodsightSettings = {
  "mainCharacterNameOverride": "MC",
  "defaultBattleView": DefaultBattleView.LAST_SELECTION,
  "maxRememberedBattles": 10,
  "damageDisplay": DamageDisplay.ONE_PER_ELEMENT,
  "onRaidLoadBehavior": OnRaidLoadBehavior.SWITCH,
  "disableImageLoading": false,
};