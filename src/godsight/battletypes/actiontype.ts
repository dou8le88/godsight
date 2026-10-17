/**
 * The types of actions we want to actually track.
 * GBF categorizes actions more as a series of outcomes
 * that the game client plays like a video.
 * The actual actions we want to record and store and display in the panel
 * exclude some of these outcomes and combine others into one.
 */
export enum ActionType {
  /**
   * Used a skill, either manually or by automatically meeting conditions. It may buff, debuff, do damage, etc.
   */
  ACTIVATED_ABILITY = 'activated_ability',
  /**
   * Buff and debuff list changed.
   */
  CONDITION_CHANGED = 'status_changed',
  CA_METER_CHANGED = 'ca_meter_changed',
  CALLED_SUMMON = 'summon',
  BOSS_SPECIAL_ATTACK = 'boss_special',
  NORMAL_ATTACK = 'normal_attack',
  SINGULAR_NORMAL_ATTACK = 'singular_normal_attack',
  CHARGED_ATTACK = 'charged_attack',
  CHAIN_BURST = 'chain_burst',
  /**
   * The player or the boss died.
   */
  DEATH = 'death',
  DAMAGE_DEALT = 'damage_dealt',
  DAMAGE_DEALT_MULTIHIT = 'damage_dealt_multihit',
  FORM_CHANGE = 'form_change',
  HEAL = 'heal',
  REPLACED_CHARACTER = 'replaced_character',
  RESURRECTED = 'resurrected',
  RETREAT = 'retreat',
  STANDBY = 'standby',
  SWITCHED_PARTIES = 'switched_parties',
  TURN_CHANGE = 'turn_change',
  USED_FULL_ELIXIR = 'used_full_elixir',
  WINDOW_EFFECT = 'window_effect',
  OMEN_CANCELLED = 'omen_cancelled',
}
