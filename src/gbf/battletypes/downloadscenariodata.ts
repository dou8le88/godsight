import { z } from 'zod';
import { ScenarioCommand } from './scenariodata/scenariocommand';
import { AbilityScenarioData } from './scenariodata/abilityscenariodata';
import { AttackPhaseTurnScenarioData } from './scenariodata/attackphaseturnscenariodata';
import { BacklineStatusScenarioData } from './scenariodata/backlinestatusscenariodata';
import { BattleLogScenarioData } from './scenariodata/battlelogscenariodata';
import { BossSpecialAttackScenarioData } from './scenariodata/bossspecialattackscenariodata';
import { BossStatusScenarioData } from './scenariodata/bossstatusscenariodata';
import { ChainBurstScenarioData } from './scenariodata/chainburstscenariodata';
import { ChargeAttackMeterChangedScenarioData } from './scenariodata/chargeattackmeterchangedscenariodata';
import { ChargeAttackScenarioData } from './scenariodata/chargeattackscenariodata';
import { DamageScenarioData } from './scenariodata/damagescenariodata';
import { DeathScenarioData } from './scenariodata/deathscenariodata';
import { FatedChainGaugeScenarioData } from './scenariodata/fatedchaingaugescenariodata';
import { FormChangeScenarioData } from './scenariodata/formchangescenariodata';
import { FullElixirScenarioData } from './scenariodata/fullelixirscenariodata';
import { HealingScenarioData } from './scenariodata/healingscenariodata';
import { HonorsGainedScenarioData } from './scenariodata/honorsgainedscenariodata';
import { HPChangedScenarioData } from './scenariodata/hpchangedscenariodata';
import { ImageChangeScenarioData } from './scenariodata/imagechangescenariodata';
import { MessageScenarioData } from './scenariodata/messagescenariodata';
import { MultihitDamageScenarioData } from './scenariodata/multihitdamagescenariodata';
import { NormalAttackScenarioData } from './scenariodata/normalattackscenariodata';
import { OmenCancelScenarioData } from './scenariodata/omencancelscenariodata';
import { PartyChangeScenarioData } from './scenariodata/partychangescenariodata';
import { PotionsChangedScenarioData } from './scenariodata/potionschangedscenariodata';
import { ReplaceCharacterScenarioData } from './scenariodata/replacecharacterscenariodata';
import { ResurrectionScenarioData } from './scenariodata/resurrectionscenariodata';
import { RetreatScenarioData } from './scenariodata/retreatscenariodata';
import { ScreenEffectScenarioData } from './scenariodata/screeneffectscenariodata';
import { StandbyScenarioData } from './scenariodata/standbyscenariodata';
import { SummonScenarioData } from './scenariodata/summonscenariodata';
import { TurnChangeScenarioData } from './scenariodata/turnchangescenariodata';
import { WindowEffectScenarioData } from './scenariodata/windoweffectscenariodata';
import { WonBattleScenarioData } from './scenariodata/wonbattlescenariodata';

const _BackgroundChangeScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._BACKGROUND_CHANGE),
});

const _BgmScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._BGM),
});

const _ConditionScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._CONDITION),
});

const _DropScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._DROP),
});

const _GroupGaugeScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._GROUP_GAUGE),
});

const _InformationScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._INFORMATION),
});

const _LineMessageScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._LINE_MESSAGE),
});

const _LoseScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._LOSE),
});

const _ModeChangeScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._MODE_CHANGE),
});

const _MotionScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._MOTION),
});

const _MotionLinkScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._MOTION_LINK),
});

const _NormalAttackStartScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand.NORMAL_ATTACK_START),
});

const _NormalAttackEndScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand.NORMAL_ATTACK_END),
});

const _OneshotKillScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._ONESHOT_KILL),
});

const _ResurrectionAvailableScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._RESURRECTION_AVAILABLE),
});

const _SpecialChangeScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._SPECIAL_CHANGE),
});

const _SummonCutinScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._SUMMON_CUTIN),
});

const _UniqueGaugeScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._UNIQUE_GAUGE),
});

const _VoiceScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._VOICE),
});

const _WaitScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand._WAIT),
});

const _EmptyPlaceholderScenarioData = z.object({
  'cmd': z.literal(ScenarioCommand.__EMPTY_SCENARIO_PLACEHOLDER),
});

export const DownloadScenarioData = z.discriminatedUnion('cmd', [
  AbilityScenarioData,
  AttackPhaseTurnScenarioData,
  BacklineStatusScenarioData,
  BattleLogScenarioData,
  ChainBurstScenarioData,
  ChargeAttackMeterChangedScenarioData,
  DeathScenarioData,
  FatedChainGaugeScenarioData,
  FormChangeScenarioData,
  FullElixirScenarioData,
  HonorsGainedScenarioData,
  ImageChangeScenarioData,
  MessageScenarioData,
  OmenCancelScenarioData,
  PartyChangeScenarioData,
  PotionsChangedScenarioData,
  ReplaceCharacterScenarioData,
  ResurrectionScenarioData,
  RetreatScenarioData,
  ScreenEffectScenarioData,
  StandbyScenarioData,
  TurnChangeScenarioData,
  WindowEffectScenarioData,
  WonBattleScenarioData,

  // Scenario data with damage.
  BossSpecialAttackScenarioData,
  BossStatusScenarioData,
  ChargeAttackScenarioData,
  DamageScenarioData,
  HealingScenarioData,
  HPChangedScenarioData,
  MultihitDamageScenarioData,
  NormalAttackScenarioData,
  SummonScenarioData,

  // Placeholders for known commands so that everything fully typechecks.
  _BackgroundChangeScenarioData,
  _BgmScenarioData,
  _ConditionScenarioData,
  _DropScenarioData,
  _GroupGaugeScenarioData,
  _InformationScenarioData,
  _LineMessageScenarioData,
  _LoseScenarioData,
  _ModeChangeScenarioData,
  _MotionLinkScenarioData,
  _MotionScenarioData,
  _NormalAttackStartScenarioData,
  _NormalAttackEndScenarioData,
  _OneshotKillScenarioData,
  _ResurrectionAvailableScenarioData,
  _SpecialChangeScenarioData,
  _SummonCutinScenarioData,
  _UniqueGaugeScenarioData,
  _VoiceScenarioData,
  _WaitScenarioData,
  _EmptyPlaceholderScenarioData,
]);
