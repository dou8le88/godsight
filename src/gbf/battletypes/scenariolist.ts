import { z } from 'zod';
import { ScenarioData } from './scenariodata/scenariodata';
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

export const TypedScenarioData = z.discriminatedUnion('cmd', [
  AbilityScenarioData,
  AttackPhaseTurnScenarioData,
  BacklineStatusScenarioData,
  BattleLogScenarioData,
  BossSpecialAttackScenarioData,
  BossStatusScenarioData,
  ChainBurstScenarioData,
  ChargeAttackMeterChangedScenarioData,
  ChargeAttackScenarioData,
  DamageScenarioData,
  DeathScenarioData,
  FatedChainGaugeScenarioData,
  FormChangeScenarioData,
  FullElixirScenarioData,
  HealingScenarioData,
  HonorsGainedScenarioData,
  HPChangedScenarioData,
  ImageChangeScenarioData,
  MessageScenarioData,
  MultihitDamageScenarioData,
  NormalAttackScenarioData,
  OmenCancelScenarioData,
  PartyChangeScenarioData,
  PotionsChangedScenarioData,
  ReplaceCharacterScenarioData,
  ResurrectionScenarioData,
  RetreatScenarioData,
  ScreenEffectScenarioData,
  StandbyScenarioData,
  SummonScenarioData,
  TurnChangeScenarioData,
  WindowEffectScenarioData,
  WonBattleScenarioData,
]);

export const ScenarioList = z.array(
  z.union([
    z.union([
      TypedScenarioData,
      // Fall back to plain scenario data.
      ScenarioData,
    ]),
    z
      .array(
        // Sometimes we can get empty arrays instead of scenario commands.
        // This will error if the array actually has something in it,
        // but otherwise transform empty arrays into placeholder scenario commands.
        z.object({
          '____impossible_field': z.string(),
        }),
      )
      .transform((_nothing) => {
        return {
          'cmd': ScenarioCommand.__EMPTY_SCENARIO_PLACEHOLDER,
        };
      }),
  ]),
);
