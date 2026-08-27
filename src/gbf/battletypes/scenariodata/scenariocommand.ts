/**
 * GBF handles the result of battle actions via "commands", JSON objects that contain
 * data on how to manipulate the battle UI.
 *
 * The total number of commands is much higher than shown here, but we only include the ones
 * we care about.
 */
export enum ScenarioCommand {
  /**
   * The player pressed a skill button, or sometimes, an automatic effect fired.
   *
   * In normal gameplay, pressing a skill fires this event, followed by a
   * `DAMAGE_DEALT` or `DAMAGE_DEALT_MULTIHIT` effect if the ability dealt damage,
   * or a `MESSAGE` command if it buffed or debuffed, or both.
   *
   * In certain circumstances, such as when triggering Beelzebub's subaura, this
   * can show up with a Japanese name and we must rely on the following `MESSAGE` event
   * to fix that, while keeping the positional data from this command.
   */
  ABILITY = "ability",
  /**
   * Functions as an override for "incorrectly-provided" Japanese names for certain effects.
   * E.g., when certain effects like Agastia Manatura activate. The `WINDOW_EFFECT` command doesn't have
   * any data about the source of the effect, but it does have the corrected name,
   * so the controlling logic should handle such a scenario.
   */
  WINDOW_EFFECT = "windoweffect",
  /**
   * A previous action produced changes to the player's buff and debuff list.
   * Contains the total list, may be ignorable in some or all scenarios.
   */
  CONDITION = "condition",
  /**
   * The command that actually causes messages like  "<icon> ATK Up" text to appear when characters gain buffs/debuffs.
   * Occasionally contains data like proper EN names for effects that otherwise display their Japanese names, such as
   * when MC gains the Trance buff with Beelzebub subsummon. The controlling logic should handle such a scenario.
   */
  MESSAGE = "message",
  /**
   * Current boss status, such as HP, charge diamonds, etc.
   * Includes changing the boss's name if necessary (e.g., Hexa).
   * TODO: Omen status?
   */
  BOSS_STATUS = "boss_gauge",
  /**
   * A single instance of damage was dealt, probably skill damage.
   */
  DAMAGE_DEALT = "damage",
  /**
   * Multi-hit skill damage.
   */
  DAMAGE_DEALT_MULTIHIT = "loop_damage",
  /**
   * Received raid honors for a previous action.
   */
  HONORS_GAINED = "contribution",
  /**
   * The Fated Chain gauge changed.
   */
  FATED_CHAIN_GAUGE_CHANGE = "chain_burst_gauge",
  /**
   * The player called a summon.
   */
  SUMMON = "summon",
  /**
   * Healing was applied to a target from any source.
   */
  HEALING = "heal",
  /**
   * The boss activated a special attack.
   */
  BOSS_SPECIAL_ATTACK = "super",
  /**
   * The player or Boss's CA meter equivalent changed.
   */
  CA_METER_CHANGED = "recast",
  /**
   * The player initiated a normal attack.
   */
  NORMAL_ATTACK = "attack",
  /**
   * A character other than MC used a charged attack.
   */
  CHARACTER_CHARGED_ATTACK = "special_npc",
  /**
   * The main character used a charged attack.
   */
  MC_CHARGED_ATTACK = "special",
  /**
   * TODO: Some special HP change happened - max HP hit?
   * Seems to also happen after `REPLACE_CHARACTER`.
   */
  HP_CHANGED = "hp",
  /**
   * An entity died, player or boss.
   */
  DEATH = "die",
  /**
   * A backliner replaced a frontliner, because they died or were swapped via a skill or somesuch.
   */
  REPLACE_CHARACTER = "replace",
  /**
   * You stand victorious.
   */
  WON_BATTLE = "win",
  /**
   * Used a Full Elixir.
   */
  FULL_ELIXIR = "rematch",
  RETREAT = "retire",
  POTIONS_CHANGED = "temporary",

  FORM_CHANGE = "formchange",



  /**
   * TODO: Charm, Can't Act, etc.
   */

  /**
   * Ignored command, do not use, exists for type completeness in the parser.
   */
  TURN = "turn",
  /**
   * Ignored command, do not use, exists for type completeness in the parser.
   */
  BGM = "bgm",
  /**
   * A screen effect was activated.
   * Used for chain bursts or Fated Chains as well as some other actions, but
   * we don't use it directly.
   */
  SCREEN_EFFECT = "effect",
  /**
   * Ignored command, do not use, exists for type completeness in the parser.
   */
  BATTLE_LOG = "battlelog",
  /**
   * Ignored command, do not use, exists for type completeness in the parser.
   */
  SPECIAL_CHANGE = "special_change",
}