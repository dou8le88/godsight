export interface GodsightSettings {
  /**
   * A non-configurable setting, automatically determined by examining battle data.
   * The detected language of the game client, used to adjust how certain battle data is parsed.
   */
  'gameLanguage': GameLanguage;
  'mainCharacterNameOverride': string;
  'defaultBattleView': DefaultBattleView;
  'lastSelectedBattleView'?: BattleViewTab;
  'maxRememberedBattles': number;
  'damageDisplay': DamageDisplay;
  'onRaidLoadBehavior': OnRaidLoadBehavior;
  'displayDPM': boolean;
  'enableImageLoading': boolean;
  'clickStatusToLoadImage': boolean;
  'visibleStats': {
    'totalDamage': boolean;
    'normalAttackDamage': boolean;
    'skillDamage': boolean;
    'chargedAttackDamage': boolean;
    'otherDamage': boolean;
    'hitCount': boolean;
    'normalAttackHits': boolean;
    'skillHits': boolean;
    'chargedAttackHits': boolean;
    'otherHits': boolean;
    'debuffs': boolean;
    'tripleAttacks': boolean;
  };
  /**
   * Display developer options in config.
   */
  'devMode': boolean;
  /**
   * Saves GBF network requests for recorded battles to a folder in the Downloads directory.
   * Used to get real data for constructing tests.
   */
  'downloadBattleData': boolean;
}

export enum DefaultBattleView {
  LAST_SELECTION = 'Last Selected',
  STATS = 'Stats',
  TURN_ACTIONS = 'Turn Actions',
}

export enum BattleViewTab {
  STATS,
  TURN_ACTIONS,
}

export enum DamageDisplay {
  SINGLE_NUMBER = 'Single Number',
  ONE_PER_ELEMENT = 'One per Element',
  ALL_HITS = 'All Hits',
}

export enum OnRaidLoadBehavior {
  SWITCH = 'Switch to Raid',
  NOTIFY = 'Notify',
  NO_ACTION = 'No Action',
}

export enum GameLanguage {
  EN = 'en',
  JA = 'ja',
}

export const DefaultSettings: GodsightSettings = {
  'gameLanguage': GameLanguage.EN,
  'mainCharacterNameOverride': 'MC',
  'defaultBattleView': DefaultBattleView.LAST_SELECTION,
  'maxRememberedBattles': 10,
  'damageDisplay': DamageDisplay.ALL_HITS,
  'onRaidLoadBehavior': OnRaidLoadBehavior.SWITCH,
  'displayDPM': true,
  'enableImageLoading': false,
  'clickStatusToLoadImage': false,
  'visibleStats': {
    'totalDamage': true,
    'normalAttackDamage': true,
    'skillDamage': true,
    'chargedAttackDamage': true,
    'otherDamage': true,
    'hitCount': true,
    'normalAttackHits': true,
    'skillHits': true,
    'chargedAttackHits': false,
    'otherHits': false,
    'debuffs': true,
    'tripleAttacks': true,
  },
  'devMode': false,
  'downloadBattleData': false,
};
