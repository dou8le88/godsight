export interface GodsightSettings {
  "mainCharacterNameOverride": string,
  "defaultBattleView": DefaultBattleView,
  "lastSelectedBattleView"?: BattleViewTab,
  "maxRememberedBattles": number,
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

export const DefaultSettings: GodsightSettings = {
  "mainCharacterNameOverride": "MC",
  "defaultBattleView": DefaultBattleView.LAST_SELECTION,
  "maxRememberedBattles": 10,
};