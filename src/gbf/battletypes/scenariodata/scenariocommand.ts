/**
 * GBF handles the result of battle actions via "commands", JSON objects that contain
 * data on how to manipulate the battle UI.
 *
 * Many do not map to actions we care about; these are prefixed with an underscore (_).
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
  ABILITY = 'ability',
  /**
   * Functions as an override for "incorrectly-provided" Japanese names for certain effects.
   * E.g., when certain effects like Agastia Manatura activate. The `WINDOW_EFFECT` command doesn't have
   * any data about the source of the effect, but it does have the corrected name,
   * so the controlling logic should handle such a scenario.
   */
  WINDOW_EFFECT = 'windoweffect',
  /**
   * The command that actually causes messages like  "<icon> ATK Up" text to appear when characters gain buffs/debuffs.
   * Occasionally contains data like proper EN names for effects that otherwise display their Japanese names, such as
   * when MC gains the Trance buff with Beelzebub subsummon. The controlling logic should handle such a scenario.
   */
  MESSAGE = 'message',
  /**
   * Current boss status, such as HP, charge diamonds, etc.
   * Includes changing the boss's name if necessary (e.g., Hexa).
   */
  BOSS_STATUS = 'boss_gauge',
  /**
   * A single instance of damage was dealt, probably skill damage.
   */
  DAMAGE_DEALT = 'damage',
  /**
   * Multi-hit skill damage.
   */
  DAMAGE_DEALT_MULTIHIT = 'loop_damage',
  /**
   * Received raid honors for a previous action.
   */
  HONORS_GAINED = 'contribution',
  /**
   * The Fated Chain gauge changed.
   */
  FATED_CHAIN_GAUGE_CHANGE = 'chain_burst_gauge',
  /**
   * The player called a summon.
   */
  SUMMON = 'summon',
  /**
   * Healing was applied to a target from any source.
   */
  HEALING = 'heal',
  /**
   * The boss activated a special attack.
   */
  BOSS_SPECIAL_ATTACK = 'super',
  /**
   * The player or Boss's CA meter equivalent changed.
   */
  CA_METER_CHANGED = 'recast',
  /**
   * A character other than MC used a charged attack.
   */
  CHARACTER_CHARGED_ATTACK = 'special_npc',
  /**
   * The main character used a charged attack.
   */
  MC_CHARGED_ATTACK = 'special',
  /**
   * An entity died, player or boss.
   */
  DEATH = 'die',
  /**
   * One enemy in a multi-enemy battle died.
   */
  STOP = 'stop',
  /**
   * A backliner replaced a frontliner, because they died or were swapped via a skill or somesuch.
   */
  REPLACE_CHARACTER = 'replace',
  /**
   * You stand victorious.
   */
  WON_BATTLE = 'win',
  /**
   * Used a Full Elixir.
   */
  FULL_ELIXIR = 'rematch',
  RETREAT = 'retire',
  _POTIONS_CHANGED = 'temporary',

  FORM_CHANGE = 'formchange',

  CHAIN_BURST = 'chain_cutin',

  /**
   * Beginning of a sequence of `NORMAL_ATTACK` commands by one character.
   * A triple attack would consist of three `NORMAL_ATTACK` commands afterwards,
   * followed by a `NORMAL_ATTACK_END` command.
   */
  NORMAL_ATTACK_START = 'normal_attack_start',
  /**
   * The player initiated a single normal attack.
   */
  NORMAL_ATTACK = 'attack',
  /**
   * End of a sequence of normal attacks by one character.
   */
  NORMAL_ATTACK_END = 'normal_attack_end',
  /**
   * Set the turn counter.
   */
  TURN_CHANGE = 'turn_change',

  OMEN_CANCEL = 'special_skill_interrupt',

  /**
   * An effect disabled the player's attack phase (e.g., charm).
   * Boss probably uses something else cuz there's no target field.
   */
  STANDBY = 'standby',

  RESURRECTION_AVAILABLE = 'resurrection_available',

  RESURRECTION = 'resurrection',

  /**
   * Signals the shift from actions by one Actor (e.g., the player) to that of another (e.g., the boss).
   * Currently only seen this between the end of the player's attack phase and the start of the boss's.
   */
  TURN = 'turn',

  /**
   * Updates the status of the backline, e.g. when a boss special
   * hits backline allies like Seofon's Carro Magnifico.
   */
  BACKLINE_STATUS = 'status_back',

  /**
   * Sometimes contains useful information about certain actions, such as attacking under the effects of Confusion.
   * Not directly processed but instead used by other actions.
   */
  _BATTLE_LOG = 'battlelog',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _BGM = 'bgm',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _BACKGROUND_CHANGE = 'bg_change',
  /**
   * A screen effect was activated.
   * Used for chain bursts or Fated Chains as well as some other actions, but
   * we don't use it directly.
   */
  _SCREEN_EFFECT = 'effect',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _SPECIAL_CHANGE = 'special_change',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _HP_CHANGED = 'hp',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _CONDITION = 'condition',
  /**
   * Mode bar changed.
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _MODE_CHANGE = 'modechange',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _WAIT = 'wait',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _IMAGE_CHANGE = 'image_change',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _DROP = 'drop',
  /**
   * Increased the team gauge, think this is just in Versusia.
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _GROUP_GAUGE = 'group_gauge',
  /**
   * All special boss fight gauge changes like Seofon's, Versusia's, Agastia's, etc.
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _UNIQUE_GAUGE = 'unique_gauge',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _LOSE = 'lose',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _INFORMATION = 'information',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _MOTION = 'motion',
  /**
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _SUMMON_CUTIN = 'summon_cutin',
  /**
   * Toggling audio in-battle.
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _VOICE = 'voice',
  /**
   * Some kind of visual animation command.
   * Known to be used after a STOP command when an enemy in a multi-foe battle dies.
   * Ignored command, do not use, exists for completeness in the parser.
   */
  _MOTION_LINK = 'motion_link',
}
