import { AbilityAction } from './abilityaction';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { BossSpecialAttackAction } from './bossspecialattackaction';
import { CAMeterChangedAction } from './cameterchangedaction';
import { ChainBurstAction } from './chainburstaction';
import { ChargedAttackAction } from './chargedattackaction';
import { ConditionChangeAction } from './conditionchangeaction';
import { DamageAction } from './damageaction';
import { DBStarCharacterRescueAction } from './dbstarcharacterrescueaction';
import { DeathAction } from './deathaction';
import { FormChangeAction } from './formchangeaction';
import { FullElixirAction } from './fullelixiraction';
import { HealingAction } from './healingaction';
import { MultihitDamageAction } from './multihitdamageaction';
import { NormalAttackAction } from './normalattackaction';
import { OmenCancelAction } from './omencancelaction';
import { PartyChangeAction } from './partychangeaction';
import { ReplaceCharacterAction } from './replacecharacteraction';
import { ResurrectedAction } from './resurrectedaction';
import { RetreatAction } from './retreataction';
import { SingularNormalAttackAction } from './singularnormalattackaction';
import { StandbyAction } from './standbyaction';
import { SummonAction } from './summonaction';
import { TurnChangeAction } from './turnchangeaction';
import { WindowEffectAction } from './windoweffectaction';

export class BattleActionParser {
  static fromJSON(json: Record<string, unknown>): BattleAction | undefined {
    const actionType = json['actionType'];
    if (actionType) {
      switch (actionType as ActionType) {
        case ActionType.ACTIVATED_ABILITY:
          return AbilityAction.fromJSON(json);

        case ActionType.BOSS_SPECIAL_ATTACK:
          return BossSpecialAttackAction.fromJSON(json);

        case ActionType.CALLED_SUMMON:
          return SummonAction.fromJSON(json);

        case ActionType.CA_METER_CHANGED:
          return CAMeterChangedAction.fromJSON(json);

        case ActionType.CHAIN_BURST:
          return ChainBurstAction.fromJSON(json);

        case ActionType.CHARGED_ATTACK:
          return ChargedAttackAction.fromJSON(json);

        case ActionType.CONDITION_CHANGED:
          return ConditionChangeAction.fromJSON(json);

        case ActionType.DAMAGE_DEALT:
          return DamageAction.fromJSON(json);

        case ActionType.DAMAGE_DEALT_MULTIHIT:
          return MultihitDamageAction.fromJSON(json);

        case ActionType.DEATH:
          return DeathAction.fromJSON(json);

        case ActionType.HEAL:
          return HealingAction.fromJSON(json);

        case ActionType.NORMAL_ATTACK:
          return NormalAttackAction.fromJSON(json);

        case ActionType.REPLACED_CHARACTER:
          return ReplaceCharacterAction.fromJSON(json);

        case ActionType.SINGULAR_NORMAL_ATTACK:
          return SingularNormalAttackAction.fromJSON(json);

        case ActionType.USED_FULL_ELIXIR:
          return FullElixirAction.fromJSON(json);

        case ActionType.WINDOW_EFFECT:
          return WindowEffectAction.fromJSON(json);

        case ActionType.TURN_CHANGE:
          return TurnChangeAction.fromJSON(json);

        case ActionType.OMEN_CANCELLED:
          return OmenCancelAction.fromJSON(json);

        case ActionType.STANDBY:
          return StandbyAction.fromJSON(json);

        case ActionType.RETREAT:
          return RetreatAction.fromJSON(json);

        case ActionType.RESURRECTED:
          return ResurrectedAction.fromJSON(json);

        case ActionType.FORM_CHANGE:
          return FormChangeAction.fromJSON(json);

        case ActionType.SWITCHED_PARTIES:
          return PartyChangeAction.fromJSON(json);

        case ActionType.STAR_CHARACTER_RESCUE:
          return DBStarCharacterRescueAction.fromJSON(json);

        default:
          console.error(`Unknown action type ${actionType}!`);
          return undefined;
      }
    } else {
      console.error(`BattleAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
