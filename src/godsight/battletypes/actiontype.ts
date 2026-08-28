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
  ACTIVATED_ABILITY = "activated_ability",
  /**
   * An automatic effect fired as a result of some action.
   * This is bonus skill damage after a CA, bonus buffs, skill damage on casting a dispel, etc.
   */
  AUTOMATIC_EFFECT = "automatic_effect",
  /**
   * Buff and debuff list changed.
   */
  CONDITION_CHANGED = "status_changed",
  CA_METER_CHANGED = "ca_meter_changed",
  /**
   * Self damage comes in several forms.
   * - Debuffs that deal EOT damage like burn/poison.
   * - Sacrificing HP.
   * - Healing when afflicted with Zombified.
   *
   * It's a special case where the damage doesn't necessarily have
   * a directly-associated source in GBF's scenario paradigm.
   * Certain effects like sacrificing HP as part of an ability or CA will likely be grouped under those actions.
   */
  SELF_DAMAGE = "self_damage",
  CALLED_SUMMON = "summon",
  BOSS_SPECIAL_ATTACK = "boss_special",
  NORMAL_ATTACK = "normal_attack",
  SINGULAR_NORMAL_ATTACK = "singular_normal_attack",
  CHARGED_ATTACK = "charged_attack",
  CHAIN_BURST = "chain_burst",
  /**
   * The player or the boss died.
   */
  DEATH = "death",
  DAMAGE_DEALT = "damage_dealt",
  DAMAGE_DEALT_MULTIHIT = "damage_dealt_multihit",
  HEAL = "heal",
  REPLACED_CHARACTER = "replaced_character",
  UPDATE_BOSS_STATUS = "update_boss_status",
  USED_POTION = "used_potion",
  USED_FULL_ELIXIR = "used_full_elixir",
  WINDOW_EFFECT = "window_effect",
}