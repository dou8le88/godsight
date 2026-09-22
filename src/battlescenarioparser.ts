import { AbilityScenarioData } from "./gbf/battletypes/scenariodata/abilityscenariodata";
import { BossSpecialAttackScenarioData } from "./gbf/battletypes/scenariodata/bossspecialattackscenariodata";
import { BossStatusScenarioData } from "./gbf/battletypes/scenariodata/bossstatusscenariodata";
import { ChargeAttackMeterChangedScenarioData } from "./gbf/battletypes/scenariodata/chargeattackmeterchangedscenariodata";
import { ChargedAttackDamageInstanceHelper, ChargedAttackScenarioData } from "./gbf/battletypes/scenariodata/chargedattackscenariodata";
import { DamageScenarioData } from "./gbf/battletypes/scenariodata/damagescenariodata";
import { DeathScenarioData } from "./gbf/battletypes/scenariodata/deathscenariodata";
import { FatedChainGaugeScenarioData } from "./gbf/battletypes/scenariodata/fatedchaingaugescenariodata";
import { FormChangeScenarioData } from "./gbf/battletypes/scenariodata/formchangescenariodata";
import { GenericScenarioData } from "./gbf/battletypes/scenariodata/genericscenariodata";
import { HonorsGainedScenarioData } from "./gbf/battletypes/scenariodata/honorsgainedscenariodata";
import { GameElement, GameElementValue } from "./gbf/battletypes/scenariodata/mechanics/element";
import { StatusType } from "./gbf/battletypes/scenariodata/mechanics/statustype";
import { Actor } from "./gbf/battletypes/scenariodata/mechanics/actor";
import { MessageScenarioData } from "./gbf/battletypes/scenariodata/messagescenariodata";
import { MultihitDamageScenarioData } from "./gbf/battletypes/scenariodata/multihitdamagescenariodata";
import { NormalAttackDamage, NormalAttackScenarioData } from "./gbf/battletypes/scenariodata/normalattackscenariodata";
import { ReplaceCharacterScenarioData } from "./gbf/battletypes/scenariodata/replacecharacterscenariodata";
import { ScenarioCommand } from "./gbf/battletypes/scenariodata/scenariocommand";
import { HealingScenarioData } from "./gbf/battletypes/scenariodata/healingscenariodata";
import { WindowEffectScenarioData } from "./gbf/battletypes/scenariodata/windoweffectscenariodata";
import { BossData, StartData } from "./gbf/battletypes/startdata";
import { AbilityAction } from "./godsight/battletypes/abilityaction";
import { BattleAction } from "./godsight/battletypes/battleaction";
import { GodsightBattleData } from "./godsight/battletypes/battledata";
import { GodsightBossData } from "./godsight/battletypes/bossdata";
import { BossSpecialAttackAction } from "./godsight/battletypes/bossspecialattackaction";
import { CAMeterChangedAction } from "./godsight/battletypes/cameterchangedaction";
import { ChargedAttackAction } from "./godsight/battletypes/chargedattackaction";
import { ConditionChangeAction } from "./godsight/battletypes/conditionchangeaction";
import { DamageAction } from "./godsight/battletypes/damageaction";
import { DamageInstance } from "./godsight/battletypes/damageinstance";
import { DeathAction } from "./godsight/battletypes/deathaction";
import { FullElixirAction } from "./godsight/battletypes/fullelixiraction";
import { MultihitDamageAction } from "./godsight/battletypes/multihitdamageaction";
import { NormalAttackAction } from "./godsight/battletypes/normalattackaction";
import { ReplaceCharacterAction } from "./godsight/battletypes/replacecharacteraction";
import { SingularNormalAttackAction } from "./godsight/battletypes/singularnormalattackaction";
import { WindowEffectAction } from "./godsight/battletypes/windoweffectaction";
import { HealingAction } from "./godsight/battletypes/healingaction";
import { SummonScenarioData } from "./gbf/battletypes/scenariodata/summonscenariodata";
import { SummonAction } from "./godsight/battletypes/summonaction";
import { BattleProgressStatus } from "./godsight/battletypes/battleprogressstatus";
import { WonBattleScenarioData } from "./gbf/battletypes/scenariodata/wonbattlescenariodata";
import { ChainBurstScenarioData } from "./gbf/battletypes/scenariodata/chainburstscenariodata";
import { ChainBurstAction } from "./godsight/battletypes/chainburstaction";
import { ScreenEffectScenarioData } from "./gbf/battletypes/scenariodata/screeneffectscenariodata";
import { TurnData } from "./godsight/battletypes/turndata";
import { GodsightCondition } from "./godsight/battletypes/condition";
import { GodsightStatusType } from "./godsight/battletypes/statustype";
import { StatsUpdateHelper } from "./godsight/battletypes/stats";
import { TurnChangeScenarioData } from "./gbf/battletypes/scenariodata/turnchangescenariodata";
import { TurnChangeAction } from "./godsight/battletypes/turnchangeaction";
import { OmenCancelScenarioData } from "./gbf/battletypes/scenariodata/omencancelscenariodata";
import { OmenCancelAction } from "./godsight/battletypes/omencancelaction";
import { StandbyScenarioData } from "./gbf/battletypes/scenariodata/standbyscenariodata";
import { StandbyAction } from "./godsight/battletypes/standbyaction";
import { BattleLogScenarioData } from "./gbf/battletypes/scenariodata/battlelogscenariodata";
import { RetreatAction } from "./godsight/battletypes/retreataction";
import { GodsightPartyFormationData, PartyFormationHelper } from "./godsight/battletypes/partyformationdata";
import { GranblueBattleData } from "./gbf/battletypes/battledata";
import { BattleActionHelper } from "./godsight/battletypes/battleactionhelper";
import { ResurrectionScenarioData } from "./gbf/battletypes/scenariodata/resurrectionscenariodata";
import { ResurrectedAction } from "./godsight/battletypes/resurrectedaction";
import { AttackPhaseTurnScenarioData } from "./gbf/battletypes/scenariodata/attackphaseturnscenariodata";
import { AttackAccuracyResult } from "./gbf/battletypes/scenariodata/mechanics/attackaccuracyresult";

export class BattleScenarioParser {
  constructor() {
    // No params needed.
  }

  /**
   * Parses game battle scenario data.
   * @param scenarioData The data to process
   * @param battleData Main info about the battle, such as boss and party member status.
   * @param baseActionNumber The baseline action counter. 0 for a fresh turn, or 1 + the last known action counter.
   * @returns a list of actions describing the scenario.
   */
  public parseScenarioData(
    scenarioData: GenericScenarioData[],
    gbfBattleData: GranblueBattleData,
    battleData: GodsightBattleData,
  ): BattleAction[] {
    return this._parseScenarioData(scenarioData, gbfBattleData, battleData, false).actions;
  }

  private containsJapaneseRegex = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;
  private summonHitCountRegex = /(\d+)-hit/;

  private filteredAbilityNames = [
    "Paralyze effect to a foe",
  ];

  /**
   * Parses game battle scenario data.
   * @param scenarioData The data to process
   * @param godsightBattleData Main info about the battle, such as boss and party member status.
   * @param stopOnMainAction Used when calling the method recursively to stop when a "separate" action is reached while processing subactions.
   * @returns a list of actions and the last index processed in the array.
   */
  private _parseScenarioData(
    scenarioData: GenericScenarioData[],
    gbfBattleData: GranblueBattleData,
    godsightBattleData: GodsightBattleData,
    isBossAttackPhase: boolean,
    stopOnMainAction?: boolean,
    stopOnTheseActions?: ScenarioCommand[],
  ): { actions: BattleAction[], lastIndex: number, isBossAttackPhase: boolean } {
    const actions: BattleAction[] = [];
    let i = 0;
    baseLoop: for (; i < scenarioData.length; i++) {
      const scenario = scenarioData[i];
      if (stopOnTheseActions && stopOnTheseActions.includes(scenario["cmd"])) {
        break baseLoop;
      }
      switch (scenario["cmd"]) {

        case ScenarioCommand.BOSS_STATUS:
          // Updates battle data rather than recording an action.
          this.handleBossStatusScenario(scenario as BossStatusScenarioData, godsightBattleData);
          break;

        case ScenarioCommand.FORM_CHANGE:
          // Updates battle data rather than recording an action.
          this.handleFormChangeScenario(scenario as FormChangeScenarioData, godsightBattleData);
          break;

        case ScenarioCommand.BOSS_SPECIAL_ATTACK: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const bossSpecialAttackScenario = scenario as BossSpecialAttackScenarioData;
          const subactions = this._parseScenarioData(
            scenarioData.slice(i + 1),
            gbfBattleData,
            godsightBattleData,
            isBossAttackPhase,
            true,
          );
          isBossAttackPhase = subactions.isBossAttackPhase;
          const bossSpecialAttackAction = new BossSpecialAttackAction(
            bossSpecialAttackScenario["name"],
            godsightBattleData["boss"][bossSpecialAttackScenario["pos"]]["name"],
            bossSpecialAttackScenario["target"],
            godsightBattleData["party"]["partyMemberCount"],
            (bossSpecialAttackScenario["list"] || []).flatMap(l => l["damage"]).map(instance => {
              const receiverIndex = bossSpecialAttackScenario["target"] == Actor.PLAYER ?
                BattleActionHelper.getCharacterIndexAtPosition(
                  godsightBattleData["party"],
                  instance["pos"],
                ) : instance["pos"];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData["boss"],
                godsightBattleData["party"],
                bossSpecialAttackScenario["target"],
                instance["pos"],
              );
              const damageInstance: DamageInstance = {
                "element": "attr" in instance && instance["attr"] !== "" ? instance["attr"] : GameElement.NULL_PLAIN,
                "receiverIndex": receiverIndex,
                "receiverName": receiverName,
                "value": instance["value"],
                "receiverHpAfterDamage": instance["hp"],
                "critical": instance["critical"],
                "miss": instance["miss"],
                "guarded": instance["guard"],
              };
              return damageInstance;
            }),
            // Peek ahead at further scenarios to find out the consequences of this one, so we can associate them.
            subactions.actions,
          );
          actions.push(bossSpecialAttackAction);
          // Skip ahead past actions we already included as subactions.
          i += subactions.lastIndex;
          break;
        }

        case ScenarioCommand.CA_METER_CHANGED: {
          const meterChangeScenario = scenario as ChargeAttackMeterChangedScenarioData;
          const meterChangedAction = this.handleMeterChangeScenario(
            meterChangeScenario,
            godsightBattleData,
          );
          // handle not getting any bar (due to debuffs, already being at max, etc.)
          // or diamondless enemies getting funny calcs.
          if (meterChangedAction.change != 0 && Math.abs(meterChangedAction.change) < 1000) {
            actions.push(meterChangedAction);
          }
          break;
        }

        case ScenarioCommand.MESSAGE: {
          const buffDebuffChangeScenario = scenario as MessageScenarioData;
          const buffDebuffActions = this.handleMessageScenario(
            godsightBattleData,
            buffDebuffChangeScenario,
          );
          actions.push(...buffDebuffActions);
          break;
        }

        case ScenarioCommand.DEATH: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const deathScenario = scenario as DeathScenarioData;
          actions.push(this.handleDeathScenario(godsightBattleData, deathScenario));
          break;
        }

        case ScenarioCommand.ABILITY: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const abilityScenario = scenario as AbilityScenarioData;
          const subactions = this._parseScenarioData(
            scenarioData.slice(i + 1),
            gbfBattleData,
            godsightBattleData,
            isBossAttackPhase,
            true,
          );
          isBossAttackPhase = subactions.isBossAttackPhase;
          if (subactions.actions.length == 0) {
            // Sometimes we have empty ability commands followed by real ones, dunno why, the client is weird.
            // The real ability command should happen next so just break and continue the loop.
            break;
          }
          const sourceName = BattleActionHelper.getActorName(
            godsightBattleData["boss"],
            godsightBattleData["party"],
            abilityScenario["to"],
            abilityScenario["pos"],
          );
          const sourceIndex = BattleActionHelper.getActorIndex(
            godsightBattleData["party"],
            abilityScenario["to"],
            abilityScenario["pos"],
          );
          const abilityAction = new AbilityAction(
            abilityScenario["name"],
            abilityScenario["to"],
            sourceName,
            sourceIndex,
            godsightBattleData["party"]["partyMemberCount"],
            subactions.actions,
          );
          // Fix various ways that the Ability command can be supremely unhelpful.
          // There are numerous scenarios where we have empty ability names and have
          // to use surrounding commands as context to display something useful.
          if (!abilityAction.name || this.containsJapaneseRegex.test(abilityAction.name)) {
            const windowSubactions = abilityAction.subactions.filter(a => a instanceof WindowEffectAction) as WindowEffectAction[];
            const firstNamedWindowSubaction = windowSubactions.find(a =>
              a.name && !this.containsJapaneseRegex.test(a.name)
            );
            if (firstNamedWindowSubaction) {
              abilityAction.name = firstNamedWindowSubaction.name;
            }
          }
          abilityAction.subactions = abilityAction.subactions.filter(a => !(a instanceof WindowEffectAction));

          if (
            !this.containsJapaneseRegex.test(abilityAction.name) &&
            !this.filteredAbilityNames.includes(abilityAction.name)
          ) {
            if (abilityAction.name != "") {
              actions.push(abilityAction);
            } else {
              const previousScenario = scenarioData[i - 1];
              if (previousScenario && previousScenario["cmd"] == ScenarioCommand._BATTLE_LOG) {
                const battleLogScenario = previousScenario as BattleLogScenarioData;
                abilityAction.overrideMessage = battleLogScenario["body"];
                actions.push(abilityAction);
              } else {
                // No known way (yet) to make sense of this Ability command, so just
                // let the subactions be independent.
                actions.push(...abilityAction.subactions);
              }
            }
          } else {
            // No known way (yet) to make sense of this Ability command, so just
            // let the subactions be independent.
            actions.push(...abilityAction.subactions);
          }

          if (
            abilityAction.subactions.find(a => a instanceof SingularNormalAttackAction) &&
            !abilityAction.subactions.find(a => a instanceof NormalAttackAction)
          ) {
            // This ability happened in the middle of a normal attack sequence.
            // This probably only happens with Soldier bullets.
            const attacks = abilityAction.subactions.filter(a => a instanceof SingularNormalAttackAction);
            abilityAction.subactions = abilityAction.subactions.filter(a => !(a instanceof SingularNormalAttackAction));
            attacks.forEach(a => {
              if (!actions.includes(a)) {
                actions.push(a);
              }
            });
          }

          // Skip ahead past actions we already included as subactions.
          i += subactions.lastIndex;
          break;
        }

        case ScenarioCommand.HONORS_GAINED: {
          const honorsGainedScenario = scenario as HonorsGainedScenarioData;
          godsightBattleData["honors"] += honorsGainedScenario["amount"];
          break;
        }

        case ScenarioCommand.REPLACE_CHARACTER: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const replaceCharacterScenario = scenario as ReplaceCharacterScenarioData;
          const position = replaceCharacterScenario["pos"];
          const newCharacter = Number(replaceCharacterScenario["npc"]);
          const entireFormation = godsightBattleData["party"]["frontline"].concat(godsightBattleData["party"]["backline"]);
          const currentCharacterAtPos = entireFormation[position];
          const oldPositionOfNewCharacter = entireFormation.findIndex(c => c == newCharacter);
          const replaceCharacterAction = new ReplaceCharacterAction(
            PartyFormationHelper.getNameOfCharacterInPosition(
              godsightBattleData["party"],
              position,
            ),
            PartyFormationHelper.getNameOfCharacterInPosition(
              godsightBattleData["party"],
              oldPositionOfNewCharacter,
            ),
          );
          actions.push(replaceCharacterAction);

          entireFormation[position] = newCharacter;
          entireFormation[oldPositionOfNewCharacter] = currentCharacterAtPos;
          const newFrontline = entireFormation.slice(0, 4);
          const newBackline = entireFormation.slice(4);
          godsightBattleData["party"]["frontline"] = newFrontline;
          godsightBattleData["party"]["backline"] = newBackline;
          break;
        }

        case ScenarioCommand.WINDOW_EFFECT: {
          const windowScenario = scenario as WindowEffectScenarioData;
          const windowAction = new WindowEffectAction(
            windowScenario["name"],
          );
          if (windowAction.name) {
            actions.push(windowAction);
          }
          break;
        }

        case ScenarioCommand.DAMAGE_DEALT: {
          const damageDealtScenario = scenario as DamageScenarioData;
          const damageAction = new DamageAction(
            damageDealtScenario["to"],
            godsightBattleData["party"]["partyMemberCount"],
            damageDealtScenario["turn_end"] !== undefined ? damageDealtScenario["turn_end"] : false,
            damageDealtScenario["list"].map(l => {
              const receiverIndex = damageDealtScenario["to"] == Actor.PLAYER ?
                BattleActionHelper.getCharacterIndexAtPosition(
                  godsightBattleData["party"],
                  l["pos"],
                ) : l["pos"];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData["boss"],
                godsightBattleData["party"],
                damageDealtScenario["to"],
                l["pos"],
              );
              return {
                "receiverIndex": receiverIndex,
                "receiverName": receiverName,
                "currentHit": l["attack_num"],
                "element": "color" in l && l["color"] !== "" ? l["color"] : GameElement.NULL_PLAIN,
                "value": l["value"],
                "receiverHpAfterDamage": l["hp"],
                "critical": l["critical"],
                "guarded": l["guard"],
                "miss": l["miss"],
              };
            }),
          );
          actions.push(damageAction);
          break;
        }

        case ScenarioCommand.DAMAGE_DEALT_MULTIHIT: {
          const multihitDamageScenario = scenario as MultihitDamageScenarioData;
          const instances: DamageInstance[] = multihitDamageScenario["list"].flat(1).map(hit => {
            const receiverIndex = multihitDamageScenario["to"] == Actor.PLAYER ?
              BattleActionHelper.getCharacterIndexAtPosition(
                godsightBattleData["party"],
                hit["pos"],
              ) : hit["pos"];
            const receiverName = BattleActionHelper.getActorName(
              godsightBattleData["boss"],
              godsightBattleData["party"],
              multihitDamageScenario["to"],
              hit["pos"],
            );
            return {
              "element": "color" in hit && hit["color"] !== "" ? hit["color"] : GameElement.NULL_PLAIN,
              "receiverIndex": receiverIndex,
              "receiverName": receiverName,
              "value": hit["value"],
              "receiverHpAfterDamage": hit["hp"],
              "critical": hit["critical"],
              "guarded": hit["guard"],
              "miss": hit["miss"],
            };
          });
          const multihitDamageAction = new MultihitDamageAction(
            multihitDamageScenario["to"],
            godsightBattleData["party"]["partyMemberCount"],
            instances,
          );
          actions.push(multihitDamageAction);
          break;
        }

        case ScenarioCommand.NORMAL_ATTACK_START: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const subactions = this._parseScenarioData(
            scenarioData.slice(i + 1),
            gbfBattleData,
            godsightBattleData,
            isBossAttackPhase,
            false,
            [
              ScenarioCommand.NORMAL_ATTACK_START,
              ScenarioCommand.NORMAL_ATTACK_END,
              ScenarioCommand.DEATH,
            ],
          );
          isBossAttackPhase = subactions.isBossAttackPhase;
          const firstNormalAttack = subactions.actions.find(a => a instanceof SingularNormalAttackAction);
          const attackerName = firstNormalAttack ?
            firstNormalAttack.source == Actor.PLAYER ?
              godsightBattleData["party"]["members"][firstNormalAttack.attackerIndex]["name"] :
              godsightBattleData["boss"][firstNormalAttack.attackerIndex]["name"] :
            "Unknown";
          const normalAttackAction = new NormalAttackAction(
            attackerName,
            firstNormalAttack ? firstNormalAttack.isCounter : false,
            subactions.actions,
          );
          actions.push(normalAttackAction);
          i += subactions.lastIndex;
          break;
        }

        case ScenarioCommand.NORMAL_ATTACK_END:
          if (stopOnMainAction) {
            break baseLoop;
          }
          break;

        case ScenarioCommand.NORMAL_ATTACK: {
          const singularNormalAttackScenario = scenario as NormalAttackScenarioData;
          const sourceDamageInstances = singularNormalAttackScenario["damage"];
          let damageArray: NormalAttackDamage[] = [];
          // For some reason, damage can come as nested arrays,
          // or as object literals that are kind of just sparse arrays...
          if (Array.isArray(sourceDamageInstances)) {
            damageArray = sourceDamageInstances.flat(1);
          } else {
            damageArray = Object.keys(sourceDamageInstances).map(key => sourceDamageInstances[key]).flat(1);
          }
          const attackerIndex = singularNormalAttackScenario["from"] == Actor.PLAYER ?
            BattleActionHelper.getCharacterIndexAtPosition(
              godsightBattleData["party"],
              singularNormalAttackScenario["pos"],
            ) : singularNormalAttackScenario["pos"];
          const isCounter = !!singularNormalAttackScenario["motion"];
          const singularNormalAttackAction = new SingularNormalAttackAction(
            singularNormalAttackScenario["from"],
            attackerIndex,
            isCounter,
            godsightBattleData["party"]["partyMemberCount"],
            damageArray.map(damage => {
              const receiverIndex = singularNormalAttackScenario["from"] == Actor.PLAYER ?
                BattleActionHelper.getCharacterIndexAtPosition(
                  godsightBattleData["party"],
                  damage["pos"],
                ) :
                damage["pos"];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData["boss"],
                godsightBattleData["party"],
                singularNormalAttackScenario["from"] == Actor.PLAYER ? Actor.BOSS : Actor.PLAYER,
                damage["pos"],
              );
              let damageElement: GameElementValue;
              if ("color" in damage) {
                if (damage["color"] !== "" && damage["color"] !== undefined) {
                  damageElement = damage["color"];
                } else {
                  damageElement = GameElement.NULL_PLAIN;
                }
              } else if ("attr" in damage) {
                if (damage["attr"] !== "" && damage["attr"] !== undefined) {
                  damageElement = damage["attr"];
                } else {
                  damageElement = GameElement.NULL_PLAIN;
                }
              } else if (isCounter) {
                damageElement = singularNormalAttackScenario["color"];
              } else {
                damageElement = GameElement.NULL_PLAIN;
              }
              return {
                "element": damageElement,
                "receiverIndex": receiverIndex,
                "receiverName": receiverName,
                "value": damage["value"],
                "receiverHpAfterDamage": damage["hp"],
                "critical": damage["critical"],
                "guarded": damage["guard"],
                "miss": damage["miss"],
              };
            }),
          );
          actions.push(singularNormalAttackAction);
          break;
        }

        case ScenarioCommand.MC_CHARGED_ATTACK:
        case ScenarioCommand.CHARACTER_CHARGED_ATTACK: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const chargedAttackScenario = scenario as ChargedAttackScenarioData;
          const wasCriticalHit = new Map<GameElementValue, boolean>();
          const allSplitChargedAttackDamage = (chargedAttackScenario["list"] || []).flatMap(l => l["damage"]);
          allSplitChargedAttackDamage.forEach(d => {
            if (d["critical"]) {
              wasCriticalHit.set(d["attr"], true);
            }
          });
          const hpAfterDamage = allSplitChargedAttackDamage.length ? allSplitChargedAttackDamage.at(-1)!["hp"] : undefined;
          const subactions = this._parseScenarioData(
            scenarioData.slice(i + 1),
            gbfBattleData,
            godsightBattleData,
            isBossAttackPhase,
            true,
          );
          isBossAttackPhase = subactions.isBossAttackPhase;
          const attackerIndex = BattleActionHelper.getCharacterIndexAtPosition(
            godsightBattleData["party"],
            chargedAttackScenario["pos"],
          );
          const attackerName = BattleActionHelper.getActorName(
            godsightBattleData["boss"],
            godsightBattleData["party"],
            Actor.PLAYER,
            chargedAttackScenario["pos"],
          );

          const chargedAttackAction = new ChargedAttackAction(
            chargedAttackScenario["name"],
            attackerIndex,
            attackerName,
            chargedAttackScenario["target"],
            godsightBattleData["party"]["partyMemberCount"],
            (chargedAttackScenario["total"] || []).map(damage => {
              const damageTotal = ChargedAttackDamageInstanceHelper.getTotal(damage);
              const receiverIndex = damage["pos"];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData["boss"],
                godsightBattleData["party"],
                chargedAttackScenario["target"],
                damage["pos"],
              );
              return {
                "element": "attr" in damage && damage["attr"] !== "" ? damage["attr"] : GameElement.NULL_PLAIN,
                "value": damageTotal,
                "critical": wasCriticalHit.get(damage["attr"])!,
                "receiverIndex": receiverIndex,
                "receiverName": receiverName,
                "receiverHpAfterDamage": hpAfterDamage,
                "miss": damageTotal > 0 ? AttackAccuracyResult.HIT : AttackAccuracyResult.DODGE,
                "guarded": false,
              } as DamageInstance;
            }),
            subactions.actions,
          );
          actions.push(chargedAttackAction);
          i += subactions.lastIndex;
          break;
        }

        case ScenarioCommand.FATED_CHAIN_GAUGE_CHANGE: {
          const fatedChainGaugeScenario = scenario as FatedChainGaugeScenarioData;
          godsightBattleData["fatedChainGauge"] = fatedChainGaugeScenario["value"];
          break;
        }

        case ScenarioCommand.FULL_ELIXIR: {
          // You can't use a full elixir in the middle of a turn, it's always its own button press,
          // so all subsequent commands like increasing character meter and reviving are subactions.
          const subactions = this._parseScenarioData(
            scenarioData.slice(i + 1),
            gbfBattleData,
            godsightBattleData,
            isBossAttackPhase,
          );
          isBossAttackPhase = subactions.isBossAttackPhase;
          const fullElixirAction = new FullElixirAction(
            subactions.actions,
          );
          actions.push(fullElixirAction);
          break baseLoop;
        }

        case ScenarioCommand.HEALING: {
          const healingScenario = scenario as HealingScenarioData;
          const healingAction = new HealingAction(
            healingScenario["to"],
            godsightBattleData["party"]["partyMemberCount"],
            healingScenario["list"].map(h => {
              const receiverIndex = healingScenario["to"] == Actor.PLAYER ?
                BattleActionHelper.getCharacterIndexAtPosition(
                  godsightBattleData["party"],
                  h["pos"],
                ) :
                h["pos"];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData["boss"],
                godsightBattleData["party"],
                healingScenario["to"],
                h["pos"],
              );
              return {
                "receiverIndex": receiverIndex,
                "receiverName": receiverName,
                "value": h["value"],
                "hpAfterHealing": h["hp"],
              };
            }),
          );
          actions.push(healingAction);
          break;
        }

        case ScenarioCommand.SUMMON: {
          const summonScenario = scenario as SummonScenarioData;
          const subactions = this._parseScenarioData(
            scenarioData.slice(i + 1),
            gbfBattleData,
            godsightBattleData,
            isBossAttackPhase,
          );
          let trueSummonHitCount: number | undefined;
          if (summonScenario["name"]) {
            const currentSummon = gbfBattleData["status"]["summon"].find(summon =>
              summon["skill"] == summonScenario["name"]
            );
            if (currentSummon) {
              const matchResult = currentSummon["comment"].match(this.summonHitCountRegex);
              if (matchResult) {
                trueSummonHitCount = Number(matchResult.at(-1)!);;
              }
            } else {
              console.log(`Unable to find summon matching ${summonScenario["name"]}! Hitcount may be inaccurate!`);
            }
          }
          const summonAction = new SummonAction(
            summonScenario["name"],
            BattleActionHelper.getMainCharacterName(godsightBattleData["party"]),
            godsightBattleData["party"]["partyMemberCount"],
            summonScenario["list"].flatMap(l => l["damage"]).map(damage => {
              const receiverIndex = damage["pos"];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData["boss"],
                godsightBattleData["party"],
                Actor.BOSS,
                damage["pos"],
              );
              return {
                "receiverIndex": receiverIndex,
                "receiverName": receiverName,
                "element": "color" in damage && damage["color"] !== "" ? damage["color"] : GameElement.NULL_PLAIN,
                "value": damage["value"],
                "receiverHpAfterDamage": damage["hp"],
                "critical": damage["critical"],
                "guarded": damage["guard"],
                // Summon "misses" just show up as damage value 0, so they technically can't miss.
                "miss": AttackAccuracyResult.HIT,
              } as DamageInstance;
            }),
            subactions.actions,
            trueSummonHitCount,

          );
          // This occurs due to the fact that you can reskin summons. There are two summon commands,
          // one to show the summon animation and one to show the actual damage.
          const subsummonaction = summonAction.subactions.find(a => a instanceof SummonAction);
          if (subsummonaction) {
            summonAction.damageInstances = subsummonaction.damageInstances;
            summonAction.subactions = subsummonaction.subactions;
          }
          actions.push(summonAction);
          i += subactions.lastIndex;
          break;
        }

        case ScenarioCommand.CHAIN_BURST: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const chainBurstScenario = scenario as ChainBurstScenarioData;
          const chainBurstAction = new ChainBurstAction(
            chainBurstScenario["chain_num"],
            "Unknown",
            godsightBattleData["party"]["partyMemberCount"],
            [],
          );
          // A CHAIN_BURST command should be immediately followed by _SCREEN_EFFECT
          // with its name and a DAMAGE_DEALT or DAMAGE_DEALT_MULTIHIT command
          // (the latter is solely for special multihit chainbursts like Higurashi's)
          const screenEffectScenario = scenarioData[i + 1];
          const chainBurstDamageScenario = scenarioData[i + 2];
          if (screenEffectScenario["cmd"] == ScenarioCommand._SCREEN_EFFECT) {
            chainBurstAction.name = (screenEffectScenario as ScreenEffectScenarioData)["name"];
            // Make sure to skip the command since we already processed it.
            i += 1;
          } else {
            console.error(`Chainburst command's first followup was ${screenEffectScenario["cmd"]}`);
          }
          if (chainBurstDamageScenario["cmd"] == ScenarioCommand.DAMAGE_DEALT) {
            const damageScenario = chainBurstDamageScenario as DamageScenarioData;
            chainBurstAction.damageInstances = damageScenario["list"].map(d => {
              const receiverIndex = d["pos"];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData["boss"],
                godsightBattleData["party"],
                Actor.BOSS,
                d["pos"],
              );
              return {
                "element": "color" in d && d["color"] !== "" ? d["color"] : GameElement.NULL_PLAIN,
                "receiverIndex": receiverIndex,
                "receiverName": receiverName,
                "value": d["value"],
                "receiverHpAfterDamage": d["hp"],
                "critical": d["critical"],
                "miss": d["miss"],
                "guarded": d["guard"],
              };
            });
            // Make sure to skip the command since we already processed it.
            i += 1;
          } else if (chainBurstDamageScenario["cmd"] == ScenarioCommand.DAMAGE_DEALT_MULTIHIT) {
            const multihitDamageScenario = chainBurstDamageScenario as MultihitDamageScenarioData;
            chainBurstAction.damageInstances = multihitDamageScenario["list"].flat(1).map(d => {
              const receiverIndex = d["pos"];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData["boss"],
                godsightBattleData["party"],
                Actor.BOSS,
                d["pos"],
              );
              return {
                "element": "color" in d && d["color"] !== "" ? d["color"] : GameElement.NULL_PLAIN,
                "receiverIndex": receiverIndex,
                "receiverName": receiverName,
                "value": d["value"],
                "receiverHpAfterDamage": d["hp"],
                "critical": d["critical"],
                "miss": d["miss"],
                "guarded": d["guard"],
              };
            });
            // Make sure to skip the command since we already processed it.
            i += 1;
          } else {
            console.error(`Chainburst command's second followup was ${chainBurstDamageScenario["cmd"]}`);
          }
          actions.push(chainBurstAction);
          break;
        }

        case ScenarioCommand.RETREAT: {
          godsightBattleData["battleProgressStatus"] = BattleProgressStatus.RETREATED;
          const retreatAction = new RetreatAction();
          actions.push(retreatAction);
          break baseLoop;
        }

        case ScenarioCommand.WON_BATTLE: {
          const wonBattleScenario = scenario as WonBattleScenarioData;
          if (wonBattleScenario["is_last_raid"]) {
            godsightBattleData["battleProgressStatus"] = BattleProgressStatus.WON;
          }
          break;
        }

        case ScenarioCommand.TURN_CHANGE: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const turnChangeScenario = scenario as TurnChangeScenarioData;
          const turnChangeAction = new TurnChangeAction(
            godsightBattleData["currentTurn"],
            Number(turnChangeScenario["turn"]),
          );
          godsightBattleData["updateTurnTo"] = turnChangeAction.newTurn;
          actions.push(turnChangeAction);
          break;
        }

        case ScenarioCommand.TURN: {
          const attackPhaseTurnScenario = scenario as AttackPhaseTurnScenarioData;
          if (attackPhaseTurnScenario["mode"] == Actor.BOSS) {
            isBossAttackPhase = true;
          } else {
            console.warn(`Attack phase turn shift for actor ${attackPhaseTurnScenario["mode"]}`);
          }
          if (stopOnMainAction) {
            break baseLoop;
          }
          break;
        }

        case ScenarioCommand.OMEN_CANCEL: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const omenCancelScenario = scenario as OmenCancelScenarioData;
          const omenCancelAction = new OmenCancelAction(
            godsightBattleData["boss"][omenCancelScenario["pos"]]["name"],
          );
          actions.push(omenCancelAction);
          break;
        }

        case ScenarioCommand.STANDBY: {
          // A disabling effect like charm or paralyze stopped a character from acting.
          // Some disabling effects display a custom message in the previous command.
          if (stopOnMainAction) {
            break baseLoop;
          }
          const standbyScenario = scenario as StandbyScenarioData;
          let battleMessage: string | null = null;
          const previousScenario = scenarioData[i - 1];
          if (previousScenario && previousScenario["cmd"] == ScenarioCommand._BATTLE_LOG) {
            if ((previousScenario as BattleLogScenarioData)["body"]) {
              battleMessage = (previousScenario as BattleLogScenarioData)["body"];
            }
          }
          const standbyAction = new StandbyAction(
            BattleActionHelper.getActorName(
              godsightBattleData["boss"],
              godsightBattleData["party"],
              Actor.PLAYER,
              standbyScenario["pos"],
            ),
            standbyScenario["standby"],
            battleMessage,
          );
          actions.push(standbyAction);
          break;
        }

        case ScenarioCommand.RESURRECTION: {
          const resurrectionScenario = scenario as ResurrectionScenarioData;
          const resurrectedAction = new ResurrectedAction(
            BattleActionHelper.getActorName(
              godsightBattleData["boss"],
              godsightBattleData["party"],
              Actor.PLAYER,
              resurrectionScenario["pos"],
            ),
            resurrectionScenario["name"],
          );
          // TODO: handle party formation changes due to resurrection.
          actions.push(resurrectedAction);
          break;
        }

        // May be able to limit how many EOT actions are grouped together
        // via checking for a wait after the boss's attack phase.
        case ScenarioCommand._WAIT:
          if (isBossAttackPhase && stopOnMainAction) {
            break baseLoop;
          }
          break;


        case ScenarioCommand.RESURRECTION_AVAILABLE:
          break;

        case ScenarioCommand._BATTLE_LOG: {
          // This can be used for charm/can't act type effects, but is also used for other stuff,
          // so we try to narrow it down based on patterns.
          const nextScenario = scenarioData[i + 1];
          const prevScenario = scenarioData[i - 1];
          if (isBossAttackPhase && (
            (nextScenario && nextScenario["cmd"] == ScenarioCommand._WAIT) ||
            (prevScenario && prevScenario["cmd"] == ScenarioCommand._SCREEN_EFFECT && (prevScenario as ScreenEffectScenarioData)["to"] == Actor.BOSS)
          )) {
            if (nextScenario["cmd"] == ScenarioCommand.BOSS_SPECIAL_ATTACK) {
              break;
            }
            if (stopOnMainAction) {
              break baseLoop;
            }
            const battleLogScenario = scenario as BattleLogScenarioData;
            const standbyAction = new StandbyAction(
              "Placeholder",
              true,
              battleLogScenario["body"],
            );
            actions.push(standbyAction);
          }
          break;
        }

        case ScenarioCommand.BACKLINE_STATUS:
          break;

        // All of these commands are recognized but ignored.
        case ScenarioCommand._POTIONS_CHANGED:
        case ScenarioCommand._HP_CHANGED:
        case ScenarioCommand._SPECIAL_CHANGE:
        case ScenarioCommand._CONDITION:
        case ScenarioCommand._SCREEN_EFFECT:
        case ScenarioCommand._BGM:
        case ScenarioCommand._BACKGROUND_CHANGE:
        case ScenarioCommand._MODE_CHANGE:
        case ScenarioCommand._IMAGE_CHANGE:
        case ScenarioCommand._DROP:
        case ScenarioCommand._GROUP_GAUGE:
        case ScenarioCommand._UNIQUE_GAUGE:
        case ScenarioCommand._LOSE:
        case ScenarioCommand._INFORMATION:
        case ScenarioCommand._MOTION:
        case ScenarioCommand._SUMMON_CUTIN:
        case undefined:
          break;
        default:
          console.warn(`Unhandled command ${scenario["cmd"]}`);
          break;
      }
    }

    return {
      lastIndex: i,
      actions,
      isBossAttackPhase,
    };
  }

  private handleDeathScenario(
    battleData: GodsightBattleData,
    deathScenario: DeathScenarioData,
  ): BattleAction {
    const action = new DeathAction(
      deathScenario["to"],
      BattleActionHelper.getActorName(
        battleData["boss"],
        battleData["party"],
        deathScenario["to"],
        deathScenario["pos"],
      ),
      typeof deathScenario["index"] === "number" ? deathScenario["index"] : null,
    );

    return action;
  }

  private handleFormChangeScenario(formChangeScenario: FormChangeScenarioData, battleData: GodsightBattleData): void {
    if (formChangeScenario["to"] == Actor.BOSS) {
      battleData.boss[formChangeScenario["pos"]] =
        this.getBossDataFromFormChangeScenario(formChangeScenario, battleData["boss"][formChangeScenario["pos"]]);
    }
  }

  private handleBossStatusScenario(bossScenario: BossStatusScenarioData, battleData: GodsightBattleData): void {
    battleData["boss"][bossScenario["pos"]] =
      this.getBossDataFromBossStatusScenario(bossScenario, battleData["boss"][bossScenario["pos"]]);
  }

  private handleMeterChangeScenario(
    meterChangeScenario: ChargeAttackMeterChangedScenarioData,
    battleData: GodsightBattleData,
  ): CAMeterChangedAction {
    const position = meterChangeScenario["pos"];
    const target = meterChangeScenario["to"];
    let newValue = meterChangeScenario["value"];

    let initialValue = newValue;
    let change = 0;
    if (target == Actor.PLAYER) {
      const allyIndex = battleData["party"]["frontline"][position];
      const targetAlly = battleData["party"]["members"][allyIndex];
      initialValue = targetAlly.meter;

      targetAlly["meter"] = newValue;
      change = newValue - initialValue;
    } else {
      const boss = battleData["boss"][position];
      initialValue = boss["currentDiamonds"];
      newValue = Number(meterChangeScenario["max"]) - newValue;
      change = newValue - initialValue;
      boss["currentDiamonds"] = newValue;
    }

    const action = new CAMeterChangedAction(
      target,
      BattleActionHelper.getActorName(
        battleData["boss"],
        battleData["party"],
        meterChangeScenario["to"],
        meterChangeScenario["pos"],
      ),
      newValue,
      change,
    );

    return action;
  }

  private handleMessageScenario(
    battleData: GodsightBattleData,
    buffDebuffChangeScenario: MessageScenarioData,
  ): BattleAction[] {
    const actions: BattleAction[] = [];
    // Buffs and debuffs changed.
    const bossChanges = buffDebuffChangeScenario["data"]["boss"]
    const playerChanges = buffDebuffChangeScenario["data"]["player"]
    if (bossChanges) {
      const allBossChanges = bossChanges.flat(1);
      const uniquePositions = new Set(allBossChanges.map(b => b["pos"]));

      const allBossConditionActions: Record<string, ConditionChangeAction> = {};

      uniquePositions.forEach(pos => {
        allBossConditionActions[pos] = new ConditionChangeAction(
          Actor.BOSS,
          BattleActionHelper.getActorName(
            battleData["boss"],
            battleData["party"],
            Actor.BOSS,
            pos,
          ),
          0,
          [],
          [],
          [],
        );
      });

      allBossChanges.forEach(change => {
        const position = change["pos"];
        let destination: GodsightCondition[] = [];
        const missPool: GodsightCondition[] = [];
        let type = GodsightStatusType.UNKNOWN;
        switch (String(change["type"])) {
          case StatusType.DEBUFF:
          case StatusType.LOCAL_BOSS_DEBUFF:
            type = GodsightStatusType.DEBUFF;
            destination = allBossConditionActions[position].debuffs;
            break;
          case StatusType.BUFF:
          case StatusType.LOCAL_BOSS_BUFF:
            type = GodsightStatusType.BUFF;
            destination = allBossConditionActions[position].buffs;
            break;
          default:
            if (change["miss"] !== undefined && change["miss"] > 0) {
              destination = missPool;
              allBossConditionActions[position].missCount += 1;
            } else {
              type = GodsightStatusType.UNKNOWN;
              destination = allBossConditionActions[position].unclassified;
              break;
            }
        }

        destination.push({
          "name": change["text"],
          "type": type,
          "icon": change["status"],
          "dispelled": ("dispel" in change && change["dispel"] == 1),
        });
      });

      Object.keys(allBossConditionActions).forEach(pos => {
        if (allBossConditionActions[pos].buffs.length ||
          allBossConditionActions[pos].debuffs.length ||
          allBossConditionActions[pos].unclassified.length) {
          actions.push(allBossConditionActions[pos]);
        }
      });
    }
    if (playerChanges) {
      const allPositions = Object.keys(playerChanges);
      const uniquePositions = new Set(allPositions);

      const allPlayerConditionActions: Record<string, ConditionChangeAction> = {};

      uniquePositions.forEach(pos => {
        allPlayerConditionActions[pos] = new ConditionChangeAction(
          Actor.PLAYER,
          BattleActionHelper.getActorName(
            battleData["boss"],
            battleData["party"],
            Actor.PLAYER,
            Number(pos),
          ),
          0,
          [],
          [],
          [],
        );
      });

      allPositions.forEach(position => {
        playerChanges[position].forEach(change => {
          let destination: GodsightCondition[] = [];
          const missPool: GodsightCondition[] = [];
          let type = GodsightStatusType.UNKNOWN;
          switch (String(change["type"])) {
            case StatusType.BUFF:
              type = GodsightStatusType.BUFF;
              destination = allPlayerConditionActions[position].buffs;
              break;
            case StatusType.DEBUFF:
              type = GodsightStatusType.DEBUFF;
              destination = allPlayerConditionActions[position].debuffs;
              break;
            case StatusType.LOCAL_BOSS_DEBUFF:
            case StatusType.LOCAL_BOSS_BUFF:
              type = GodsightStatusType.UNKNOWN;
              console.error("Boss debuff status types in player list? Must be wrong classification.");
              break;
            default:
              if (change["miss"] !== undefined && change["miss"] > 0) {
                destination = missPool;
                allPlayerConditionActions[position].missCount += 1;
              } else {
                type = GodsightStatusType.UNKNOWN;
                destination = allPlayerConditionActions[position].unclassified;
                break;
              }
              break;
          }

          if (change["text"]) {
            destination.push({
              "name": change["text"],
              "type": type,
              "icon": change["status"],
              "dispelled": ("dispel" in change && change["dispel"] == 1),
            });
          }
        });
      });

      Object.keys(allPlayerConditionActions).forEach(pos => {
        if (allPlayerConditionActions[pos].buffs.length ||
          allPlayerConditionActions[pos].debuffs.length ||
          allPlayerConditionActions[pos].unclassified.length) {
          actions.push(allPlayerConditionActions[pos]);
        }
      });
    }

    return actions;
  }

  public parseStartData(startData: StartData): GodsightBattleData {
    const party = {
      "partyMemberCount": startData["player"]["number"],
      "frontline": startData["formation"].map(idx => Number(idx)),
      "backline": startData["back_formation"].map(idx => Number(idx)),
      "members": startData["player"]["param"].map(character => {
        return {
          "name": character["name"],
          "characterId": String(character["setting_id"]),
          "isMC": Boolean(character["leader"]),
          /**
           * Portrait filename to be used in the URL.
           */
          "portraitImageId": character["pid_image"],
          "hpMax": character["hpmax"],
          "hp": character["hp"],
          "meter": character["recast"],
          "meterMax": Number(character["recastmax"]),
          "element": character["attr"],
          "weaponProficiency": character["weapon"],
          "alive": Boolean(character["alive"]),
          "buffCount": (character["condition"]["buff"] || []).length,
          "debuffCount": (character["condition"]["debuff"] || []).length,
          "canBeResurrected": character["resurrection_availble_flag"], // sic
          "isGuarding": Boolean(Number(character["is_guard_status"])),
          "canGuard": !Number(character["is_guard_unavailable"]),
          "isVanished": Boolean(character["is_vanished"]),
        };
      }),
    };

    const battleData: GodsightBattleData = {
      "raidId": startData["raid_id"],
      "questId": startData["quest_id"],
      "IsCoopRaid": startData["is_coopraid"],
      "isHost": startData["is_host"],
      "currentTurn": Number(startData["turn"]),
      /**
       * We only receive commands that tell us about increases to this value and not the current value.
       */
      "honors": 0,
      "battleStats": StatsUpdateHelper.getEmptyStatsUpdate(party["partyMemberCount"]),
      "fatedChainGauge": Number(startData["chain_burst_gauge"] || 0),
      "battleProgressStatus": BattleProgressStatus.ACTIVE,
      /**
       * If we miss a battle finish action while Godsight is closed,
       * we can use this time reference to determine if it has already expired.
       */
      "expirationTime": Date.now() + (startData["timer"] * 1000),
      "lastUpdated": Date.now(),
      "party": party,
      "boss": startData["boss"]["param"].map((b) => this.getBossData(b)),
      "turnData": {},
    };

    // Bosses can start the battle with actions, reflected in the "scenario" field.
    // It's empty when loading into a raid in the middle of some arbitrary turn,
    // so if we have a non-empty scenario, our convention is that those entries belong to turn 0.
    if (startData["scenario"].length) {
      battleData["currentTurn"] = 0;
      const actions = this.parseScenarioData(startData["scenario"], startData, battleData);
      battleData["turnData"][0] = this.processTurnActionData(actions, party);
    }

    return battleData;
  }

  public processTurnActionData(battleActions: BattleAction[], party: GodsightPartyFormationData): TurnData {
    const baseStats = StatsUpdateHelper.getEmptyStatsUpdate(party["partyMemberCount"]);
    const statUpdates = battleActions.map(action => action.getStats());
    const totalStats = statUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      baseStats
    );

    return {
      "turnStats": totalStats["generalStats"],
      "characterCurrentTurnStats": totalStats["characterStats"],
      "turnActions": battleActions,
    };
  }

  private getBossData(b: BossData): GodsightBossData {
    const maxDiamonds = Number(b["recastmax"]);
    const currentDiamonds = Number(b["recast"]);
    const currentHp = Number(b["hp"]);

    const godsightBossData: GodsightBossData = {
      "name": b["name"]["en"],
      "element": b["attr"],
      "hpCurrent": currentHp,
      "hpMax": b["hpmax"],
      "maxDiamonds": isNaN(maxDiamonds) ? 0 : maxDiamonds - 1,
      // For some reason empty diamonds is set to max in data, and it counts down to 1 as diamonds fill.
      "currentDiamonds": isNaN(maxDiamonds) ? 0 : maxDiamonds - currentDiamonds,
    };

    return godsightBossData;
  }

  private getBossDataFromBossStatusScenario(b: BossStatusScenarioData, existingData: GodsightBossData): GodsightBossData {
    const maxDiamonds = Number(b["recastmax"]);
    const currentDiamonds = Number(b["recast"]);

    const godsightBossData: GodsightBossData = {
      "name": b["name"]["en"],
      "element": b["attr"],
      "hpCurrent": b["hp"],
      "hpMax": existingData["hpMax"],
      "maxDiamonds": isNaN(maxDiamonds) ? 0 : maxDiamonds - 1,
      // For some reason empty diamonds is set to max in data, and it counts down to 1 as diamonds fill.
      "currentDiamonds": isNaN(maxDiamonds) ? 0 : maxDiamonds - currentDiamonds,
    };

    // TODO: maybe return a CAMeterChangedAction if diamonds changed?

    return godsightBossData;
  }

  private getBossDataFromFormChangeScenario(b: FormChangeScenarioData, existingData: GodsightBossData): GodsightBossData {
    const godsightBossData: GodsightBossData = {
      "name": b["param"]["name"]["en"],
      "element": b["param"]["attr"],
      "hpCurrent": existingData["hpCurrent"],
      "hpMax": existingData["hpMax"],
      "maxDiamonds": existingData["maxDiamonds"],
      "currentDiamonds": existingData["currentDiamonds"],
    };

    return godsightBossData;
  }
}