import {
  AbilityMotion,
  AbilityScenarioData,
} from './gbf/battletypes/scenariodata/abilityscenariodata';
import { BossSpecialAttackScenarioData } from './gbf/battletypes/scenariodata/bossspecialattackscenariodata';
import { BossStatusScenarioData } from './gbf/battletypes/scenariodata/bossstatusscenariodata';
import { ChargeAttackMeterChangedScenarioData } from './gbf/battletypes/scenariodata/chargeattackmeterchangedscenariodata';
import {
  ChargedAttackDamageInstanceHelper,
  ChargedAttackScenarioData,
} from './gbf/battletypes/scenariodata/chargedattackscenariodata';
import { DamageScenarioData } from './gbf/battletypes/scenariodata/damagescenariodata';
import { DeathScenarioData } from './gbf/battletypes/scenariodata/deathscenariodata';
import { FatedChainGaugeScenarioData } from './gbf/battletypes/scenariodata/fatedchaingaugescenariodata';
import { FormChangeScenarioData } from './gbf/battletypes/scenariodata/formchangescenariodata';
import { GenericScenarioData } from './gbf/battletypes/scenariodata/genericscenariodata';
import { HonorsGainedScenarioData } from './gbf/battletypes/scenariodata/honorsgainedscenariodata';
import {
  GameElement,
  GameElementHelper,
  GameElementValue,
  NumericGameElement,
} from './gbf/battletypes/scenariodata/mechanics/element';
import { StatusType } from './gbf/battletypes/scenariodata/mechanics/statustype';
import { Actor } from './gbf/battletypes/scenariodata/mechanics/actor';
import {
  AppliedStatus,
  MessageScenarioData,
} from './gbf/battletypes/scenariodata/messagescenariodata';
import { MultihitDamageScenarioData } from './gbf/battletypes/scenariodata/multihitdamagescenariodata';
import {
  NormalAttackDamage,
  NormalAttackScenarioData,
} from './gbf/battletypes/scenariodata/normalattackscenariodata';
import { ReplaceCharacterScenarioData } from './gbf/battletypes/scenariodata/replacecharacterscenariodata';
import { ScenarioCommand } from './gbf/battletypes/scenariodata/scenariocommand';
import { HealingScenarioData } from './gbf/battletypes/scenariodata/healingscenariodata';
import { WindowEffectScenarioData } from './gbf/battletypes/scenariodata/windoweffectscenariodata';
import {
  BossData,
  PartyMemberData,
  StartData,
} from './gbf/battletypes/startdata';
import { AbilityAction } from './godsight/battletypes/abilityaction';
import { BattleAction } from './godsight/battletypes/battleaction';
import { GodsightBattleData } from './godsight/battletypes/battledata';
import { GodsightBossData } from './godsight/battletypes/bossdata';
import { BossSpecialAttackAction } from './godsight/battletypes/bossspecialattackaction';
import { CAMeterChangedAction } from './godsight/battletypes/cameterchangedaction';
import { ChargedAttackAction } from './godsight/battletypes/chargedattackaction';
import { ConditionChangeAction } from './godsight/battletypes/conditionchangeaction';
import { DamageAction } from './godsight/battletypes/damageaction';
import { DamageInstance } from './godsight/battletypes/damageinstance';
import { DeathAction } from './godsight/battletypes/deathaction';
import { FullElixirAction } from './godsight/battletypes/fullelixiraction';
import { MultihitDamageAction } from './godsight/battletypes/multihitdamageaction';
import { NormalAttackAction } from './godsight/battletypes/normalattackaction';
import { ReplaceCharacterAction } from './godsight/battletypes/replacecharacteraction';
import { SingularNormalAttackAction } from './godsight/battletypes/singularnormalattackaction';
import { WindowEffectAction } from './godsight/battletypes/windoweffectaction';
import { HealingAction } from './godsight/battletypes/healingaction';
import {
  SummonDamageInstance,
  SummonScenarioData,
} from './gbf/battletypes/scenariodata/summonscenariodata';
import { SummonAction } from './godsight/battletypes/summonaction';
import { BattleProgressStatus } from './godsight/battletypes/battleprogressstatus';
import { WonBattleScenarioData } from './gbf/battletypes/scenariodata/wonbattlescenariodata';
import { ChainBurstScenarioData } from './gbf/battletypes/scenariodata/chainburstscenariodata';
import { ChainBurstAction } from './godsight/battletypes/chainburstaction';
import { ScreenEffectScenarioData } from './gbf/battletypes/scenariodata/screeneffectscenariodata';
import { TurnData } from './godsight/battletypes/turndata';
import { GodsightCondition } from './godsight/battletypes/condition';
import { GodsightStatusType } from './godsight/battletypes/statustype';
import { StatsUpdateHelper } from './godsight/battletypes/stats';
import { TurnChangeScenarioData } from './gbf/battletypes/scenariodata/turnchangescenariodata';
import { TurnChangeAction } from './godsight/battletypes/turnchangeaction';
import { OmenCancelScenarioData } from './gbf/battletypes/scenariodata/omencancelscenariodata';
import { OmenCancelAction } from './godsight/battletypes/omencancelaction';
import { StandbyScenarioData } from './gbf/battletypes/scenariodata/standbyscenariodata';
import { StandbyAction } from './godsight/battletypes/standbyaction';
import { BattleLogScenarioData } from './gbf/battletypes/scenariodata/battlelogscenariodata';
import { RetreatAction } from './godsight/battletypes/retreataction';
import {
  GodsightPartyFormationData,
  GodsightPartyMemberData,
  PartyFormationHelper,
} from './godsight/battletypes/partyformationdata';
import { GranblueBattleData } from './gbf/battletypes/battledata';
import { BattleActionHelper } from './godsight/battletypes/battleactionhelper';
import { ResurrectionScenarioData } from './gbf/battletypes/scenariodata/resurrectionscenariodata';
import { ResurrectedAction } from './godsight/battletypes/resurrectedaction';
import { AttackPhaseTurnScenarioData } from './gbf/battletypes/scenariodata/attackphaseturnscenariodata';
import { AttackAccuracyResult } from './gbf/battletypes/scenariodata/mechanics/attackaccuracyresult';
import { SkillOrDebuffDamageInstance } from './gbf/battletypes/scenariodata/individualdamageinstance';
import { StopScenarioData } from './gbf/battletypes/scenariodata/stopscenariodata';
import { HealingInstance } from './godsight/battletypes/healinginstance';
import { HPChangedScenarioData } from './gbf/battletypes/scenariodata/hpchangedscenariodata';
import { ImageChangeScenarioData } from './gbf/battletypes/scenariodata/imagechangescenariodata';
import { FormChangeAction } from './godsight/battletypes/formchangeaction';
import { PartyChangeScenarioData } from './gbf/battletypes/scenariodata/partychangescenariodata';
import { identity } from './util/functional';
import { range } from './util/range';
import { PartyChangeAction } from './godsight/battletypes/partychangeaction';
import { GodsightSummonData } from './godsight/battletypes/summondata';

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
    return this._parseScenarioData(
      scenarioData,
      gbfBattleData,
      battleData,
      false,
      false,
      false,
    ).actions;
  }

  private containsJapaneseRegex =
    /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;
  private summonHitCountRegex = /(\d+)-hit/;
  private summonTargetRegex = /DMG[^/]*?to all foes/;

  private filteredAbilityNames = ['Paralyze effect to a foe'];

  /**
   * Parses game battle scenario data.
   * @param scenarioData The data to process
   * @param godsightBattleData Main info about the battle, such as boss and party member status.
   * @param stopOnMainAction Used when calling the method recursively to stop when a "separate" action is reached while processing subactions.
   * @param stopOnTheseActions Used when calling the method recursively to stop on specific commands.
   * @returns a list of actions and the last index processed in the array.
   */
  private _parseScenarioData(
    scenarioData: GenericScenarioData[],
    gbfBattleData: GranblueBattleData,
    godsightBattleData: GodsightBattleData,
    isBossAttackPhase: boolean,
    isRecursive: boolean,
    stopOnMainAction: boolean,
    stopOnTheseActions?: ScenarioCommand[],
  ): {
    actions: BattleAction[];
    lastIndex: number;
    isBossAttackPhase: boolean;
  } {
    const actions: BattleAction[] = [];
    let i = 0;
    baseLoop: for (; i < scenarioData.length; i++) {
      const scenario = scenarioData[i];
      if (stopOnTheseActions && stopOnTheseActions.includes(scenario['cmd'])) {
        break baseLoop;
      }
      switch (scenario['cmd']) {
        case ScenarioCommand.BOSS_STATUS:
          // Updates battle data rather than recording an action.
          this.handleBossStatusScenario(
            scenario as BossStatusScenarioData,
            godsightBattleData,
          );
          break;

        case ScenarioCommand.FORM_CHANGE: {
          const action = this.handleFormChangeScenario(
            scenario as FormChangeScenarioData,
            godsightBattleData,
            isBossAttackPhase,
          );
          if (action) {
            actions.push(action);
          }
          break;
        }

        case ScenarioCommand.BOSS_SPECIAL_ATTACK: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const bossSpecialAttackScenario =
            scenario as BossSpecialAttackScenarioData;
          const subactions = this._parseScenarioData(
            scenarioData.slice(i + 1),
            gbfBattleData,
            godsightBattleData,
            isBossAttackPhase,
            /* isRecursive */ true,
            /* stopOnMainAction */ true,
          );
          isBossAttackPhase = subactions.isBossAttackPhase;
          const bossSpecialAttackAction = new BossSpecialAttackAction(
            bossSpecialAttackScenario['name'],
            godsightBattleData['boss'][bossSpecialAttackScenario['pos']][
              'name'
            ],
            bossSpecialAttackScenario['target'],
            godsightBattleData['party']['partyMemberCount'],
            !isBossAttackPhase,
            (bossSpecialAttackScenario['list'] || [])
              .flatMap((l) => l['damage'])
              .map((instance) => {
                const receiverIndex =
                  bossSpecialAttackScenario['target'] == Actor.PLAYER
                    ? BattleActionHelper.getCharacterIndexAtPosition(
                        godsightBattleData['party'],
                        instance['pos'],
                      )
                    : instance['pos'];
                const receiverName = BattleActionHelper.getActorName(
                  godsightBattleData['boss'],
                  godsightBattleData['party'],
                  bossSpecialAttackScenario['target'],
                  instance['pos'],
                );
                const damageInstance: DamageInstance = {
                  'element':
                    'attr' in instance && instance['attr'] !== ''
                      ? GameElementHelper.getNumericGameElement(
                          instance['attr'],
                        )
                      : GameElement.NULL_PLAIN,
                  'receiverIndex': receiverIndex,
                  'receiverName': receiverName,
                  'value': instance['value'],
                  'receiverHpAfterDamage': instance['hp'],
                  'critical': instance['critical'],
                  'miss': instance['miss'],
                  'guarded': instance['guard'],
                };
                BattleActionHelper.updateReceiverHp(
                  godsightBattleData,
                  bossSpecialAttackScenario['target'],
                  receiverIndex,
                  instance['hp'],
                );
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
          const meterChangeScenario =
            scenario as ChargeAttackMeterChangedScenarioData;
          const meterChangedAction = this.handleMeterChangeScenario(
            meterChangeScenario,
            godsightBattleData,
            isBossAttackPhase,
          );
          // handle not getting any bar (due to debuffs, already being at max, etc.)
          // or diamondless enemies getting funny calcs.
          if (
            meterChangedAction.change != 0 &&
            Math.abs(meterChangedAction.change) < 1000
          ) {
            actions.push(meterChangedAction);
          }
          break;
        }

        case ScenarioCommand.MESSAGE: {
          const buffDebuffChangeScenario = scenario as MessageScenarioData;
          const buffDebuffActions = this.handleMessageScenario(
            godsightBattleData,
            buffDebuffChangeScenario,
            isBossAttackPhase,
          );
          if (
            !isRecursive &&
            buffDebuffActions.reduce<number>(
              (prev, cur) => prev + cur.debuffs.length,
              0,
            ) > 0
          ) {
            // Top-level debuff application can't attribute itself to any particular character.
            // There are a few scenarios where we can generally assume it to actually belong to
            // a previous action.
            const previousAction = actions.at(-1);
            if (previousAction) {
              if (previousAction instanceof NormalAttackAction) {
                previousAction.subactions.push(...buffDebuffActions);
              } else {
                actions.push(...buffDebuffActions);
              }
            } else {
              actions.push(...buffDebuffActions);
            }
          } else {
            actions.push(...buffDebuffActions);
          }
          break;
        }

        // STOP cmd is functionally the same as a DEATH cmd.
        case ScenarioCommand.STOP:
        case ScenarioCommand.DEATH: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const deathScenario = scenario as DeathScenarioData;
          actions.push(
            this.handleDeathScenario(
              godsightBattleData,
              deathScenario,
              isBossAttackPhase,
            ),
          );
          const deadActorIdx = BattleActionHelper.getActorIndex(
            godsightBattleData['party'],
            deathScenario['to'],
            deathScenario['pos'],
          );
          if (deathScenario['to'] == Actor.PLAYER) {
            godsightBattleData['party']['members'][deadActorIdx]['alive'] =
              false;
            godsightBattleData['party']['members'][deadActorIdx]['hp'] = 0;
          } else if (deathScenario['to'] == Actor.BOSS) {
            godsightBattleData['boss'][deadActorIdx]['hpCurrent'] = 0;
          }
          break;
        }

        case ScenarioCommand.ABILITY: {
          const abilityScenario = scenario as AbilityScenarioData;
          // Desperately trying to find a way to properly skip meaningless ability
          // scenarios while preserving those that do something useful.
          if (
            !abilityScenario['name'] &&
            abilityScenario['motion'] == AbilityMotion.OFF
          ) {
            const maybeNextScenario = scenarioData[i + 1];
            if (maybeNextScenario['cmd'] != ScenarioCommand.WINDOW_EFFECT) {
              break;
            }
          }
          if (stopOnMainAction) {
            break baseLoop;
          }
          const subactions = this._parseScenarioData(
            scenarioData.slice(i + 1),
            gbfBattleData,
            godsightBattleData,
            isBossAttackPhase,
            /* isRecursive */ true,
            /* stopOnMainAction */ true,
          );
          isBossAttackPhase = subactions.isBossAttackPhase;
          if (subactions.actions.length == 0) {
            // Sometimes we have empty ability commands followed by real ones, dunno why, the client is weird.
            // The real ability command should happen next so just break and continue the loop.
            // But only if we didn't process every single command looking for subactions.
            // If we did and found nothing, proceed with recording the AbilityAction since it
            // should still have some meaning in battle.
            // Examples include Rei's and Caim's turn fastforward skills.
            if (subactions.lastIndex != scenarioData.length - 1) {
              break;
            }
          }
          const sourceName = BattleActionHelper.getActorName(
            godsightBattleData['boss'],
            godsightBattleData['party'],
            abilityScenario['to'],
            abilityScenario['pos'],
          );
          if (!sourceName) {
            break;
          }
          const sourceIndex = BattleActionHelper.getActorIndex(
            godsightBattleData['party'],
            abilityScenario['to'],
            abilityScenario['pos'],
          );

          let isFatedChain = false;
          const maybePreviousScenario = scenarioData[i - 1];
          if (
            maybePreviousScenario &&
            maybePreviousScenario['cmd'] == ScenarioCommand._SCREEN_EFFECT
          ) {
            const prevScenario =
              maybePreviousScenario as ScreenEffectScenarioData;
            if (prevScenario['is_fatal_chain']) {
              isFatedChain = true;
            }
          }

          const abilityAction = new AbilityAction(
            abilityScenario['name'],
            abilityScenario['to'],
            sourceName,
            sourceIndex,
            godsightBattleData['party']['partyMemberCount'],
            !isBossAttackPhase,
            isFatedChain,
            subactions.actions,
          );
          // Fix various ways that the Ability command can be supremely unhelpful.
          // There are numerous scenarios where we have empty ability names and have
          // to use surrounding commands as context to display something useful.
          if (
            !abilityAction.name ||
            this.containsJapaneseRegex.test(abilityAction.name)
          ) {
            const windowSubactions = abilityAction.subactions.filter(
              (a) => a instanceof WindowEffectAction,
            ) as WindowEffectAction[];
            const firstNamedWindowSubaction = windowSubactions.find(
              (a) => a.name && !this.containsJapaneseRegex.test(a.name),
            );
            if (firstNamedWindowSubaction) {
              abilityAction.name = firstNamedWindowSubaction.name;
            }
          }
          abilityAction.subactions = abilityAction.subactions.filter(
            (a) => !(a instanceof WindowEffectAction),
          );

          if (
            !this.containsJapaneseRegex.test(abilityAction.name) &&
            !this.filteredAbilityNames.includes(abilityAction.name)
          ) {
            if (abilityAction.name != '') {
              actions.push(abilityAction);
            } else {
              const previousScenario = scenarioData[i - 1];
              if (
                previousScenario &&
                previousScenario['cmd'] == ScenarioCommand._BATTLE_LOG
              ) {
                const battleLogScenario =
                  previousScenario as BattleLogScenarioData;
                if (typeof battleLogScenario['body'] == 'string') {
                  abilityAction.overrideMessage = battleLogScenario['body'];
                } else {
                  abilityAction.overrideMessage =
                    battleLogScenario['body']['en'];
                }
                actions.push(abilityAction);
              } else {
                const maybeDamageSubaction = abilityAction.subactions.find(
                  (a) =>
                    a instanceof DamageAction ||
                    a instanceof MultihitDamageAction ||
                    a instanceof ConditionChangeAction,
                );
                if (maybeDamageSubaction) {
                  // Unfortunately, if we elevated the subactions to main actions,
                  // we would lose context about the actor who caused the damage/debuffs.
                  // Very unfortunately, it seems that certain effects can be
                  // inconsistently named even in the same battle, so we end up
                  // with no name for something that *should* be displaying a name.
                  // E.g., Echidna will sometimes not have a name for the skill
                  // damage from her "Primal Beast of Motherhood" passive.
                  abilityAction.name = 'Unnamed Ability';
                  actions.push(abilityAction);
                } else {
                  // No known way (yet) to make sense of this Ability command, so just
                  // let the subactions be independent.
                  actions.push(...abilityAction.subactions);
                }
              }
            }
          } else {
            // No known way (yet) to make sense of this Ability command, so just
            // let the subactions be independent.
            actions.push(...abilityAction.subactions);
          }

          if (
            abilityAction.subactions.find(
              (a) => a instanceof SingularNormalAttackAction,
            ) &&
            !abilityAction.subactions.find(
              (a) => a instanceof NormalAttackAction,
            )
          ) {
            // This ability happened in the middle of a normal attack sequence.
            // This probably only happens with Soldier bullets.
            const attacks = abilityAction.subactions.filter(
              (a) => a instanceof SingularNormalAttackAction,
            );
            abilityAction.subactions = abilityAction.subactions.filter(
              (a) => !(a instanceof SingularNormalAttackAction),
            );
            attacks.forEach((a) => {
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
          godsightBattleData['honors'] += honorsGainedScenario['amount'];
          break;
        }

        case ScenarioCommand.REPLACE_CHARACTER: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const replaceCharacterScenario =
            scenario as ReplaceCharacterScenarioData;
          const position = replaceCharacterScenario['pos'];
          const newCharacter = Number(replaceCharacterScenario['npc']);
          const entireFormation = godsightBattleData['party'][
            'frontline'
          ].concat(godsightBattleData['party']['backline']);
          const currentCharacterAtPos = entireFormation[position];
          if (newCharacter == currentCharacterAtPos) {
            break;
          }
          const oldPositionOfNewCharacter = entireFormation.findIndex(
            (c) => c == newCharacter,
          );
          const replaceCharacterAction = new ReplaceCharacterAction(
            PartyFormationHelper.getNameOfCharacterInPosition(
              godsightBattleData['party'],
              position,
            ),
            PartyFormationHelper.getNameOfCharacterInPosition(
              godsightBattleData['party'],
              oldPositionOfNewCharacter,
            ),
            !isBossAttackPhase,
          );
          actions.push(replaceCharacterAction);

          entireFormation[position] = newCharacter;
          entireFormation[oldPositionOfNewCharacter] = currentCharacterAtPos;
          const newFrontline = entireFormation.slice(0, 4);
          const newBackline = entireFormation.slice(4);
          godsightBattleData['party']['frontline'] = newFrontline;
          godsightBattleData['party']['backline'] = newBackline;
          break;
        }

        case ScenarioCommand.WINDOW_EFFECT: {
          const windowScenario = scenario as WindowEffectScenarioData;
          const windowAction = new WindowEffectAction(
            windowScenario['name'],
            !isBossAttackPhase,
          );
          if (windowAction.name) {
            actions.push(windowAction);
          }
          break;
        }

        case ScenarioCommand.DAMAGE_DEALT: {
          const damageDealtScenario = scenario as DamageScenarioData;
          const damageAction = new DamageAction(
            damageDealtScenario['to'],
            godsightBattleData['party']['partyMemberCount'],
            damageDealtScenario['turn_end'] !== undefined
              ? damageDealtScenario['turn_end']
              : false,
            !isBossAttackPhase,
            damageDealtScenario['list'].map((l) => {
              const receiverIndex =
                damageDealtScenario['to'] == Actor.PLAYER
                  ? BattleActionHelper.getCharacterIndexAtPosition(
                      godsightBattleData['party'],
                      l['pos'],
                    )
                  : l['pos'];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData['boss'],
                godsightBattleData['party'],
                damageDealtScenario['to'],
                l['pos'],
              );
              const damageInstance: DamageInstance = {
                'receiverIndex': receiverIndex,
                'receiverName': receiverName,
                'element':
                  'color' in l && l['color'] !== ''
                    ? GameElementHelper.getNumericGameElement(l['color'])
                    : GameElement.NULL_PLAIN,
                'value': l['value'],
                'receiverHpAfterDamage': l['hp'],
                'critical': l['critical'],
                'guarded': l['guard'],
                'miss': l['miss'],
              };
              BattleActionHelper.updateReceiverHp(
                godsightBattleData,
                damageDealtScenario['to'],
                receiverIndex,
                l['hp'],
              );
              return damageInstance;
            }),
          );
          actions.push(damageAction);
          break;
        }

        case ScenarioCommand.DAMAGE_DEALT_MULTIHIT: {
          const multihitDamageScenario = scenario as MultihitDamageScenarioData;
          let damageArray: SkillOrDebuffDamageInstance[] = [];
          // For some reason, damage can come as nested arrays,
          // or as object literals that are kind of just sparse arrays...
          if (Array.isArray(multihitDamageScenario['list'])) {
            damageArray = multihitDamageScenario['list'].flat(1);
          } else {
            damageArray = Object.values(multihitDamageScenario['list']).flat(1);
          }
          const instances: DamageInstance[] = damageArray.map((hit) => {
            const receiverIndex =
              multihitDamageScenario['to'] == Actor.PLAYER
                ? BattleActionHelper.getCharacterIndexAtPosition(
                    godsightBattleData['party'],
                    hit['pos'],
                  )
                : hit['pos'];
            const receiverName = BattleActionHelper.getActorName(
              godsightBattleData['boss'],
              godsightBattleData['party'],
              multihitDamageScenario['to'],
              hit['pos'],
            );
            const damageInstance: DamageInstance = {
              'element':
                'color' in hit && hit['color'] !== ''
                  ? GameElementHelper.getNumericGameElement(hit['color'])
                  : GameElement.NULL_PLAIN,
              'receiverIndex': receiverIndex,
              'receiverName': receiverName,
              'value': hit['value'],
              'receiverHpAfterDamage': hit['hp'],
              'critical': hit['critical'],
              'guarded': hit['guard'],
              'miss': hit['miss'],
            };
            BattleActionHelper.updateReceiverHp(
              godsightBattleData,
              multihitDamageScenario['to'],
              receiverIndex,
              hit['hp'],
            );
            return damageInstance;
          });
          const multihitDamageAction = new MultihitDamageAction(
            multihitDamageScenario['to'],
            godsightBattleData['party']['partyMemberCount'],
            !isBossAttackPhase,
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
            /* isRecursive */ true,
            /* stopOnMainAction */ false,
            [
              ScenarioCommand.NORMAL_ATTACK_START,
              ScenarioCommand.NORMAL_ATTACK_END,
              ScenarioCommand.DEATH,
            ],
          );
          isBossAttackPhase = subactions.isBossAttackPhase;
          const firstNormalAttack = subactions.actions.find(
            (a) => a instanceof SingularNormalAttackAction,
          );
          let attackerName = 'Unknown';
          if (firstNormalAttack) {
            if (firstNormalAttack.source == Actor.PLAYER) {
              const attackerIdx = firstNormalAttack.attackerIndex;
              attackerName =
                godsightBattleData['party']['members'][attackerIdx]['name'];
            } else {
              attackerName =
                godsightBattleData['boss'][firstNormalAttack.attackerIndex][
                  'name'
                ];
            }
          }
          const normalAttackAction = new NormalAttackAction(
            attackerName,
            firstNormalAttack ? firstNormalAttack.isCounter : false,
            godsightBattleData['party']['partyMemberCount'],
            !isBossAttackPhase,
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
          const singularNormalAttackScenario =
            scenario as NormalAttackScenarioData;
          const sourceDamageInstances = singularNormalAttackScenario['damage'];
          let damageArray: NormalAttackDamage[] = [];
          // For some reason, damage can come as nested arrays,
          // or as object literals that are kind of just sparse arrays...
          if (Array.isArray(sourceDamageInstances)) {
            damageArray = sourceDamageInstances.flat(1);
          } else {
            damageArray = Object.keys(sourceDamageInstances)
              .map((key) => sourceDamageInstances[key])
              .flat(1);
          }
          const attackerIndex =
            singularNormalAttackScenario['from'] == Actor.PLAYER
              ? BattleActionHelper.getCharacterIndexAtPosition(
                  godsightBattleData['party'],
                  singularNormalAttackScenario['pos'],
                )
              : singularNormalAttackScenario['pos'];
          const isCounter = !!singularNormalAttackScenario['motion'];
          const singularNormalAttackAction = new SingularNormalAttackAction(
            singularNormalAttackScenario['from'],
            attackerIndex,
            isCounter,
            godsightBattleData['party']['partyMemberCount'],
            !isBossAttackPhase,
            damageArray.map((damage) => {
              const receivingActor =
                singularNormalAttackScenario['from'] == Actor.PLAYER
                  ? Actor.BOSS
                  : Actor.PLAYER;
              const receiverIndex = BattleActionHelper.getActorIndex(
                godsightBattleData['party'],
                receivingActor,
                damage['pos'],
              );
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData['boss'],
                godsightBattleData['party'],
                receivingActor,
                damage['pos'],
              );
              let damageElement: GameElementValue;
              if ('color' in damage) {
                if (damage['color'] !== '' && damage['color'] !== undefined) {
                  damageElement = damage['color'];
                } else {
                  damageElement = GameElement.NULL_PLAIN;
                }
              } else if ('attr' in damage) {
                if (damage['attr'] !== '' && damage['attr'] !== undefined) {
                  damageElement = damage['attr'];
                } else {
                  damageElement = GameElement.NULL_PLAIN;
                }
              } else if (isCounter) {
                damageElement = singularNormalAttackScenario['color'];
              } else {
                damageElement = GameElement.NULL_PLAIN;
              }
              const damageInstance: DamageInstance = {
                'element':
                  GameElementHelper.getNumericGameElement(damageElement),
                'receiverIndex': receiverIndex,
                'receiverName': receiverName,
                'value': damage['value'],
                'receiverHpAfterDamage': damage['hp'],
                'critical': damage['critical'],
                'guarded': damage['guard'],
                'miss': damage['miss'],
              };
              BattleActionHelper.updateReceiverHp(
                godsightBattleData,
                receivingActor,
                receiverIndex,
                damage['hp'],
              );
              return damageInstance;
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
          const allSplitChargedAttackDamage = (
            chargedAttackScenario['list'] || []
          ).flatMap((l) => l['damage']);
          allSplitChargedAttackDamage.forEach((d) => {
            if (d['critical']) {
              wasCriticalHit.set(d['attr'], true);
            }
          });
          const hpAfterDamage = allSplitChargedAttackDamage.length
            ? allSplitChargedAttackDamage.at(-1)!['hp']
            : undefined;
          const subactions = this._parseScenarioData(
            scenarioData.slice(i + 1),
            gbfBattleData,
            godsightBattleData,
            isBossAttackPhase,
            /* isRecursive */ true,
            /* stopOnMainAction */ true,
          );
          isBossAttackPhase = subactions.isBossAttackPhase;
          const attackerIndex = BattleActionHelper.getCharacterIndexAtPosition(
            godsightBattleData['party'],
            chargedAttackScenario['pos'],
          );
          const attackerName = BattleActionHelper.getActorName(
            godsightBattleData['boss'],
            godsightBattleData['party'],
            Actor.PLAYER,
            chargedAttackScenario['pos'],
          );

          const chargedAttackAction = new ChargedAttackAction(
            chargedAttackScenario['name'],
            attackerIndex,
            attackerName,
            chargedAttackScenario['target'],
            godsightBattleData['party']['partyMemberCount'],
            !isBossAttackPhase,
            (chargedAttackScenario['total'] || []).map((damage) => {
              const damageTotal =
                ChargedAttackDamageInstanceHelper.getTotal(damage);
              const receiverIndex = damage['pos'];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData['boss'],
                godsightBattleData['party'],
                chargedAttackScenario['target'],
                damage['pos'],
              );
              const damageInstance: DamageInstance = {
                'element':
                  'attr' in damage && damage['attr'] !== ''
                    ? (Number(damage['attr']) as NumericGameElement)
                    : GameElement.NULL_PLAIN,
                'value': damageTotal,
                'critical': wasCriticalHit.get(damage['attr'])!,
                'receiverIndex': receiverIndex,
                'receiverName': receiverName,
                'receiverHpAfterDamage': hpAfterDamage,
                'miss':
                  damageTotal > 0
                    ? AttackAccuracyResult.HIT
                    : AttackAccuracyResult.DODGE,
                'guarded': false,
              };
              if (hpAfterDamage !== undefined) {
                BattleActionHelper.updateReceiverHp(
                  godsightBattleData,
                  chargedAttackScenario['target'],
                  receiverIndex,
                  hpAfterDamage,
                );
              }
              return damageInstance;
            }),
            subactions.actions,
          );
          actions.push(chargedAttackAction);
          i += subactions.lastIndex;
          break;
        }

        case ScenarioCommand.FATED_CHAIN_GAUGE_CHANGE: {
          const fatedChainGaugeScenario =
            scenario as FatedChainGaugeScenarioData;
          godsightBattleData['fatedChainGauge'] =
            fatedChainGaugeScenario['value'];
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
            /* isRecursive */ true,
            /* stopOnMainAction */ false,
          );
          isBossAttackPhase = subactions.isBossAttackPhase;
          const fullElixirAction = new FullElixirAction(
            !isBossAttackPhase,
            subactions.actions,
          );
          actions.push(fullElixirAction);
          // Full elixirs inherently reset the party order to what it was at battle start
          // and do not produce individual REPLACE_CHARACTER commands.
          const initialFormation = godsightBattleData['party']['members'].map(
            (_, idx) => idx,
          );
          const frontline = initialFormation.slice(0, 4);
          const backline = initialFormation.slice(4);
          godsightBattleData['party']['frontline'] = frontline;
          godsightBattleData['party']['backline'] = backline;
          godsightBattleData['party']['members'].forEach((char) => {
            char['alive'] = true;
          });

          break baseLoop;
        }

        case ScenarioCommand.HEALING: {
          const healingScenario = scenario as HealingScenarioData;
          const healingAction = new HealingAction(
            healingScenario['to'],
            godsightBattleData['party']['partyMemberCount'],
            !isBossAttackPhase,
            healingScenario['list'].map((h) => {
              const receiverIndex =
                healingScenario['to'] == Actor.PLAYER
                  ? BattleActionHelper.getCharacterIndexAtPosition(
                      godsightBattleData['party'],
                      h['pos'],
                    )
                  : h['pos'];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData['boss'],
                godsightBattleData['party'],
                healingScenario['to'],
                h['pos'],
              );
              const healingInstance: HealingInstance = {
                'receiverIndex': receiverIndex,
                'receiverName': receiverName,
                'value': h['value'],
                'hpAfterHealing': h['hp'],
              };
              BattleActionHelper.updateReceiverHp(
                godsightBattleData,
                healingScenario['to'],
                receiverIndex,
                h['hp'],
              );
              return healingInstance;
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
            /* isRecursive */ true,
            /* stopOnMainAction */ true,
          );
          // This is meant to guard against other characters stealing credit
          // for effects caused by summoning when using party 2 or 3 in Babyl.
          // Kinda hacky.
          const maybeMeaninglessAbilityActionIdx = godsightBattleData[
            'babylParties'
          ]
            ? subactions.actions.findIndex(
                (a) =>
                  a instanceof AbilityAction && a.name == 'Unnamed Ability',
              )
            : -1;
          if (maybeMeaninglessAbilityActionIdx != -1) {
            subactions.actions = [
              ...subactions.actions.slice(0, maybeMeaninglessAbilityActionIdx),
              ...subactions.actions[maybeMeaninglessAbilityActionIdx]
                .subactions,
              ...subactions.actions.slice(maybeMeaninglessAbilityActionIdx + 1),
            ].filter(identity);
          }
          let summonDamage: SummonDamageInstance[] = [];
          const unfixedSummonDamage = summonScenario['list'].map(
            (l) => l['damage'],
          );
          if (Array.isArray(unfixedSummonDamage[0])) {
            summonDamage = (
              unfixedSummonDamage as SummonDamageInstance[][]
            ).flat(1);
          } else {
            summonDamage = (
              unfixedSummonDamage as Record<
                string | number,
                SummonDamageInstance
              >[]
            )
              .map((l) => Object.values(l))
              .flat(1);
          }
          const damageInstances = summonDamage.map((damage) => {
            const receiverIndex = Number(damage['pos']);
            const receiverName = BattleActionHelper.getActorName(
              godsightBattleData['boss'],
              godsightBattleData['party'],
              Actor.BOSS,
              damage['pos'],
            );
            const damageInstance: DamageInstance = {
              'receiverIndex': receiverIndex,
              'receiverName': receiverName,
              'element':
                'color' in damage && damage['color'] !== ''
                  ? (Number(damage['color']) as NumericGameElement)
                  : GameElement.NULL_PLAIN,
              'value': damage['value'],
              'receiverHpAfterDamage': damage['hp'],
              'critical': damage['critical'],
              'guarded': damage['guard'],
              // Summon "misses" just show up as damage value 0, so they technically can't miss.
              'miss': AttackAccuracyResult.HIT,
            };
            BattleActionHelper.updateReceiverHp(
              godsightBattleData,
              Actor.BOSS,
              receiverIndex,
              damage['hp'],
            );
            return damageInstance;
          });
          // This occurs due to the fact that you can reskin summons. There are two summon commands,
          // one to show the summon animation and one to show the actual damage.
          const summonAction = subactions.actions.find(
            (a) => a instanceof SummonAction,
          );

          if (summonAction) {
            summonAction.summonCallName =
              summonAction.summonCallName || summonScenario['name'];
            actions.push(summonAction);
          } else {
            // Update recorded summon info.
            const newSummonInfo =
              (gbfBattleData['status'] && gbfBattleData['status']['summon']) ||
              [];

            const calledSummons: GodsightSummonData[] = [];
            newSummonInfo.forEach((summon, idx) => {
              const matchingBattleDataSummon =
                godsightBattleData['summons'][idx];
              const newCooldown = Number(summon['recast']);
              if (newCooldown > matchingBattleDataSummon['cooldown']) {
                calledSummons.push(matchingBattleDataSummon);
              }
              matchingBattleDataSummon['cooldown'] = newCooldown;
              // These two updates are for summons that change after calling, like Triple Zero.
              matchingBattleDataSummon['callName'] = summon['skill'];
              matchingBattleDataSummon['description'] = summon['comment'];
            });

            if (
              godsightBattleData['supportSummon'] &&
              gbfBattleData['status'] &&
              gbfBattleData['status']['supporter']
            ) {
              const newCooldown = Number(
                gbfBattleData['status']['supporter']['recast'],
              );
              if (
                newCooldown > godsightBattleData['supportSummon']['cooldown']
              ) {
                calledSummons.push(godsightBattleData['supportSummon']);
              }
              godsightBattleData['supportSummon']['cooldown'] = newCooldown;
            }

            const calledSummon =
              calledSummons.length == 1
                ? calledSummons[0]
                : calledSummons.find((summon) => {
                    return summon['callName'] == summonScenario['name'];
                  });

            let trueSummonHitCount: number | undefined;
            if (calledSummon) {
              const matchResult = calledSummon['description'].match(
                this.summonHitCountRegex,
              );
              if (matchResult) {
                trueSummonHitCount = Number(matchResult.at(-1)!);

                if (this.summonTargetRegex.test(calledSummon['description'])) {
                  const uniqueTargets = new Set(
                    damageInstances.map((d) => d['receiverIndex']),
                  );
                  trueSummonHitCount *= [...uniqueTargets.values()].length;
                }
              }
            } else {
              console.log(
                `Unable to find summon matching ${summonScenario['name']}! Hitcount may be inaccurate!`,
              );
            }

            actions.push(
              new SummonAction(
                calledSummon ? calledSummon['name'] : 'Unknown Summon',
                summonScenario['name'],
                godsightBattleData['lyriaIndex'],
                BattleActionHelper.getMainCharacterName(
                  godsightBattleData['party'],
                ),
                godsightBattleData['party']['partyMemberCount'],
                !isBossAttackPhase,
                damageInstances,
                subactions.actions,
                trueSummonHitCount,
              ),
            );
          }
          i += subactions.lastIndex;
          break;
        }

        case ScenarioCommand.CHAIN_BURST: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const chainBurstScenario = scenario as ChainBurstScenarioData;
          const chainBurstAction = new ChainBurstAction(
            chainBurstScenario['chain_num'],
            'Unknown',
            godsightBattleData['party']['partyMemberCount'],
            !isBossAttackPhase,
            [],
          );
          // A CHAIN_BURST command should be immediately followed by _SCREEN_EFFECT
          // with its name and a DAMAGE_DEALT or DAMAGE_DEALT_MULTIHIT command
          // (the latter is solely for special multihit chainbursts like Higurashi's)
          const screenEffectScenario = scenarioData[i + 1];
          const chainBurstDamageScenario = scenarioData[i + 2];
          if (screenEffectScenario['cmd'] == ScenarioCommand._SCREEN_EFFECT) {
            chainBurstAction.name = (
              screenEffectScenario as ScreenEffectScenarioData
            )['name'];
            // Make sure to skip the command since we already processed it.
            i += 1;
          } else {
            console.error(
              `Chainburst command's first followup was ${screenEffectScenario['cmd']}`,
            );
          }
          if (chainBurstDamageScenario['cmd'] == ScenarioCommand.DAMAGE_DEALT) {
            const damageScenario =
              chainBurstDamageScenario as DamageScenarioData;
            chainBurstAction.damageInstances = damageScenario['list'].map(
              (d) => {
                const receiverIndex = d['pos'];
                const receiverName = BattleActionHelper.getActorName(
                  godsightBattleData['boss'],
                  godsightBattleData['party'],
                  Actor.BOSS,
                  d['pos'],
                );
                const damageInstance: DamageInstance = {
                  'element':
                    'color' in d && d['color'] !== ''
                      ? GameElementHelper.getNumericGameElement(d['color'])
                      : GameElement.NULL_PLAIN,
                  'receiverIndex': receiverIndex,
                  'receiverName': receiverName,
                  'value': d['value'],
                  'receiverHpAfterDamage': d['hp'],
                  'critical': d['critical'],
                  'miss': d['miss'],
                  'guarded': d['guard'],
                };
                BattleActionHelper.updateReceiverHp(
                  godsightBattleData,
                  Actor.BOSS,
                  receiverIndex,
                  d['hp'],
                );
                return damageInstance;
              },
            );
            // Make sure to skip the command since we already processed it.
            i += 1;
          } else if (
            chainBurstDamageScenario['cmd'] ==
            ScenarioCommand.DAMAGE_DEALT_MULTIHIT
          ) {
            const multihitDamageScenario =
              chainBurstDamageScenario as MultihitDamageScenarioData;
            let damageArray: SkillOrDebuffDamageInstance[] = [];
            // For some reason, damage can come as nested arrays,
            // or as object literals that are kind of just sparse arrays...
            if (Array.isArray(multihitDamageScenario['list'])) {
              damageArray = multihitDamageScenario['list'].flat(1);
            } else {
              damageArray = Object.values(multihitDamageScenario['list']).flat(
                1,
              );
            }
            chainBurstAction.damageInstances = damageArray.map((d) => {
              const receiverIndex = d['pos'];
              const receiverName = BattleActionHelper.getActorName(
                godsightBattleData['boss'],
                godsightBattleData['party'],
                Actor.BOSS,
                d['pos'],
              );
              const damageInstance: DamageInstance = {
                'element':
                  'color' in d && d['color'] !== ''
                    ? GameElementHelper.getNumericGameElement(d['color'])
                    : GameElement.NULL_PLAIN,
                'receiverIndex': receiverIndex,
                'receiverName': receiverName,
                'value': d['value'],
                'receiverHpAfterDamage': d['hp'],
                'critical': d['critical'],
                'miss': d['miss'],
                'guarded': d['guard'],
              };
              BattleActionHelper.updateReceiverHp(
                godsightBattleData,
                Actor.BOSS,
                receiverIndex,
                d['hp'],
              );
              return damageInstance;
            });
            // Make sure to skip the command since we already processed it.
            i += 1;
          } else {
            console.error(
              `Chainburst command's second followup was ${chainBurstDamageScenario['cmd']}`,
            );
          }
          actions.push(chainBurstAction);
          break;
        }

        case ScenarioCommand.RETREAT: {
          godsightBattleData['battleProgressStatus'] =
            BattleProgressStatus.RETREATED;
          const retreatAction = new RetreatAction(!isBossAttackPhase);
          actions.push(retreatAction);
          break baseLoop;
        }

        case ScenarioCommand.WON_BATTLE: {
          const wonBattleScenario = scenario as WonBattleScenarioData;
          if (wonBattleScenario['is_last_raid']) {
            godsightBattleData['battleProgressStatus'] =
              BattleProgressStatus.WON;
          }
          if (wonBattleScenario['raid_id']) {
            godsightBattleData['updateRaidIdTo'] = wonBattleScenario['raid_id'];
          }
          break;
        }

        case ScenarioCommand.TURN_CHANGE: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const turnChangeScenario = scenario as TurnChangeScenarioData;
          const turnChangeAction = new TurnChangeAction(
            godsightBattleData['currentTurn'],
            Number(turnChangeScenario['turn']),
            !isBossAttackPhase,
          );
          godsightBattleData['updateTurnTo'] = turnChangeAction.newTurn;
          actions.push(turnChangeAction);
          break;
        }

        case ScenarioCommand.TURN: {
          const attackPhaseTurnScenario =
            scenario as AttackPhaseTurnScenarioData;
          if (attackPhaseTurnScenario['mode'] == Actor.BOSS) {
            isBossAttackPhase = true;
          } else {
            console.warn(
              `Attack phase turn shift for actor ${attackPhaseTurnScenario['mode']}`,
            );
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
            godsightBattleData['boss'][omenCancelScenario['pos']]['name'],
            !isBossAttackPhase,
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
          if (
            previousScenario &&
            previousScenario['cmd'] == ScenarioCommand._BATTLE_LOG
          ) {
            const prev = previousScenario as BattleLogScenarioData;
            if (typeof prev['body'] == 'string') {
              battleMessage = prev['body'];
            } else {
              battleMessage = prev['body']['en'];
            }
          }
          const standbyAction = new StandbyAction(
            BattleActionHelper.getActorName(
              godsightBattleData['boss'],
              godsightBattleData['party'],
              Actor.PLAYER,
              standbyScenario['pos'],
            ),
            standbyScenario['standby'],
            !isBossAttackPhase,
            battleMessage,
          );
          actions.push(standbyAction);
          break;
        }

        case ScenarioCommand.RESURRECTION: {
          const resurrectionScenario = scenario as ResurrectionScenarioData;
          const resurrectedAction = new ResurrectedAction(
            BattleActionHelper.getActorName(
              godsightBattleData['boss'],
              godsightBattleData['party'],
              Actor.PLAYER,
              resurrectionScenario['pos'],
            ),
            resurrectionScenario['name'],
            !isBossAttackPhase,
          );
          actions.push(resurrectedAction);

          BattleActionHelper.updateReceiverHp(
            godsightBattleData,
            Actor.PLAYER,
            resurrectionScenario['index'],
            resurrectionScenario['hp'],
            resurrectionScenario['hpmax'],
          );

          const characterIndex = BattleActionHelper.getActorIndex(
            godsightBattleData['party'],
            Actor.PLAYER,
            resurrectionScenario['pos'],
          );

          if (godsightBattleData['party']['members'][characterIndex]) {
            godsightBattleData['party']['members'][characterIndex]['alive'] =
              true;
          }
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
          if (
            isBossAttackPhase &&
            ((nextScenario && nextScenario['cmd'] == ScenarioCommand._WAIT) ||
              (prevScenario &&
                prevScenario['cmd'] == ScenarioCommand._SCREEN_EFFECT &&
                (prevScenario as ScreenEffectScenarioData)['to'] == Actor.BOSS))
          ) {
            if (nextScenario['cmd'] == ScenarioCommand.BOSS_SPECIAL_ATTACK) {
              break;
            }
            if (stopOnMainAction) {
              break baseLoop;
            }
            const battleLogScenario = scenario as BattleLogScenarioData;
            if (typeof battleLogScenario['body'] == 'string') {
              const standbyAction = new StandbyAction(
                'Placeholder',
                true,
                !isBossAttackPhase,
                battleLogScenario['body'],
              );
              actions.push(standbyAction);
            }
          }
          break;
        }

        case ScenarioCommand.HP_CHANGED: {
          const hpChangedScenario = scenario as HPChangedScenarioData;
          const receiverIndex = BattleActionHelper.getActorIndex(
            godsightBattleData['party'],
            hpChangedScenario['to'],
            hpChangedScenario['pos'],
          );
          BattleActionHelper.updateReceiverHp(
            godsightBattleData,
            hpChangedScenario['to'],
            receiverIndex,
            hpChangedScenario['value'],
            hpChangedScenario['max'],
          );
          break;
        }

        case ScenarioCommand.BACKLINE_STATUS:
          break;

        case ScenarioCommand.IMAGE_CHANGE: {
          const imageChangeScenario = scenario as ImageChangeScenarioData;
          const characterIdx = BattleActionHelper.getActorIndex(
            godsightBattleData['party'],
            Actor.PLAYER,
            imageChangeScenario['pos'],
          );
          if (godsightBattleData['party']['members'][characterIdx]) {
            godsightBattleData['party']['members'][characterIdx][
              'portraitImageId'
            ] = imageChangeScenario['image_id'];
          }
          break;
        }

        case ScenarioCommand.PARTY_CHANGE: {
          // Tower of Babyl party switch.
          const partyChangeScenario = scenario as PartyChangeScenarioData;
          const oldPartyId = godsightBattleData['currentBabylParty']!;
          const newPartyId = partyChangeScenario['main_party_num'];
          const newParty = godsightBattleData['babylParties']![newPartyId];

          const newFrontline = godsightBattleData['babylFormations']![
            newPartyId
          ] as number[] | undefined;

          const oldCharacterIndexOffset = this.computeCharacterIndexOffset(
            oldPartyId,
            godsightBattleData['babylParties']!,
          );

          // Put the current frontline into formations in the same format
          // as we get from start data.
          godsightBattleData['babylFormations']![oldPartyId] =
            godsightBattleData['party']['frontline'].map(
              (idx) => idx - oldCharacterIndexOffset,
            );

          const characterIndexOffset = this.computeCharacterIndexOffset(
            newPartyId,
            godsightBattleData['babylParties']!,
          );

          godsightBattleData['party']['frontline'] = (
            newFrontline || newParty.map((_, idx) => idx)
          ).map((idx) => idx + characterIndexOffset);
          godsightBattleData['party']['backline'] = range(
            0,
            godsightBattleData['party']['partyMemberCount'] - 1,
          ).filter(
            (id) => !godsightBattleData['party']['frontline'].includes(id),
          );

          godsightBattleData['currentBabylParty'] = newPartyId;
          actions.push(
            new PartyChangeAction(oldPartyId, newPartyId, !isBossAttackPhase),
          );
          break;
        }

        // All of these commands are recognized but ignored.
        case ScenarioCommand._BACKGROUND_CHANGE:
        case ScenarioCommand._BGM:
        case ScenarioCommand._CONDITION:
        case ScenarioCommand._DROP:
        case ScenarioCommand._GROUP_GAUGE:
        case ScenarioCommand._INFORMATION:
        case ScenarioCommand._LINE_MESSAGE:
        case ScenarioCommand._LOSE:
        case ScenarioCommand._MODE_CHANGE:
        case ScenarioCommand._MOTION:
        case ScenarioCommand._MOTION_LINK:
        case ScenarioCommand._POTIONS_CHANGED:
        case ScenarioCommand._SCREEN_EFFECT:
        case ScenarioCommand._SPECIAL_CHANGE:
        case ScenarioCommand._SUMMON_CUTIN:
        case ScenarioCommand._UNIQUE_GAUGE:
        case ScenarioCommand._VOICE:
        case undefined:
          break;
        default:
          console.warn(`Unhandled command ${scenario['cmd']}`);
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
    deathScenario: DeathScenarioData | StopScenarioData,
    isBossAttackPhase: boolean,
  ): BattleAction {
    const action = new DeathAction(
      deathScenario['to'],
      BattleActionHelper.getActorName(
        battleData['boss'],
        battleData['party'],
        deathScenario['to'],
        deathScenario['pos'],
      ),
      !isBossAttackPhase,
      typeof deathScenario['index'] === 'number'
        ? deathScenario['index']
        : null,
    );

    return action;
  }

  private handleFormChangeScenario(
    formChangeScenario: FormChangeScenarioData,
    battleData: GodsightBattleData,
    isBossAttackPhase: boolean,
  ): FormChangeAction | undefined {
    switch (formChangeScenario['to']) {
      case Actor.BOSS:
        battleData.boss[formChangeScenario['pos']] =
          this.getBossDataFromFormChangeScenario(
            formChangeScenario,
            battleData['boss'][formChangeScenario['pos']],
          );
        // Bosses get a ton of meaningless form changes for some reason.
        // We don't return an action for them.
        return undefined;
      case Actor.PLAYER: {
        const actorName = BattleActionHelper.getActorName(
          battleData['boss'],
          battleData['party'],
          formChangeScenario['to'],
          formChangeScenario['pos'],
        );
        // Player form changes, on the other hand, always seem to be meaningful.
        return new FormChangeAction(actorName, !isBossAttackPhase);
      }
      default:
        console.error(
          `Unknown actor ${formChangeScenario['to']} in form change scenario`,
        );
        return undefined;
    }
  }

  private handleBossStatusScenario(
    bossScenario: BossStatusScenarioData,
    battleData: GodsightBattleData,
  ): void {
    battleData['boss'][bossScenario['pos']] =
      this.getBossDataFromBossStatusScenario(
        bossScenario,
        battleData['boss'][bossScenario['pos']],
      );
  }

  private handleMeterChangeScenario(
    meterChangeScenario: ChargeAttackMeterChangedScenarioData,
    battleData: GodsightBattleData,
    isBossAttackPhase: boolean,
  ): CAMeterChangedAction {
    const position = meterChangeScenario['pos'];
    const target = meterChangeScenario['to'];
    let newValue = meterChangeScenario['value'];

    let initialValue = newValue;
    let change = 0;
    if (target == Actor.PLAYER) {
      const allyIndex = battleData['party']['frontline'][position];
      const targetAlly = battleData['party']['members'][allyIndex];
      initialValue = targetAlly.meter;
      targetAlly['meter'] = newValue;
      change = newValue - initialValue;
    } else {
      const boss = battleData['boss'][position];
      initialValue = boss['currentDiamonds'];
      newValue = Number(meterChangeScenario['max']) - newValue;
      change = newValue - initialValue;
      boss['currentDiamonds'] = newValue;
    }

    const action = new CAMeterChangedAction(
      target,
      BattleActionHelper.getActorName(
        battleData['boss'],
        battleData['party'],
        meterChangeScenario['to'],
        meterChangeScenario['pos'],
      ),
      newValue,
      change,
      !isBossAttackPhase,
    );

    return action;
  }

  private handleMessageScenario(
    battleData: GodsightBattleData,
    buffDebuffChangeScenario: MessageScenarioData,
    isBossAttackPhase: boolean,
  ): ConditionChangeAction[] {
    const actions: ConditionChangeAction[] = [];
    // Buffs and debuffs changed.
    const bossChanges = buffDebuffChangeScenario['data']['boss'];
    const playerChanges = buffDebuffChangeScenario['data']['player'];
    if (bossChanges) {
      let allBossChanges: AppliedStatus[] = []; //bossChanges.flat(1);
      // For some reason, damage can come as nested arrays,
      // or as object literals that are kind of just sparse arrays...
      if (Array.isArray(bossChanges)) {
        allBossChanges = bossChanges.flat(1);
      } else {
        allBossChanges = Object.values(bossChanges).flat(1);
      }
      const uniquePositions = new Set(allBossChanges.map((b) => b['pos']));

      const allBossConditionActions: Record<string, ConditionChangeAction> = {};

      uniquePositions.forEach((pos) => {
        allBossConditionActions[pos] = new ConditionChangeAction(
          Actor.BOSS,
          BattleActionHelper.getActorName(
            battleData['boss'],
            battleData['party'],
            Actor.BOSS,
            pos,
          ),
          0,
          !isBossAttackPhase,
          [],
          [],
          [],
        );
      });

      allBossChanges.forEach((change) => {
        const position = change['pos'];
        let destination: GodsightCondition[] = [];
        const missPool: GodsightCondition[] = [];
        let type = GodsightStatusType.UNKNOWN;
        switch (String(change['type'])) {
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
            if (change['miss'] !== undefined && change['miss'] > 0) {
              destination = missPool;
              allBossConditionActions[position].missCount += 1;
            } else {
              type = GodsightStatusType.UNKNOWN;
              destination = allBossConditionActions[position].unclassified;
              break;
            }
        }

        destination.push({
          'name': change['text'],
          'type': type,
          'icon': change['status'] ? `${change['status']}` : null,
          'dispelled': 'dispel' in change && change['dispel'] == 1,
        });
      });

      Object.keys(allBossConditionActions).forEach((pos) => {
        if (
          allBossConditionActions[pos].buffs.length ||
          allBossConditionActions[pos].debuffs.length ||
          allBossConditionActions[pos].unclassified.length ||
          allBossConditionActions[pos].missCount > 0
        ) {
          actions.push(allBossConditionActions[pos]);
        }
      });
    }
    if (playerChanges) {
      const allPositions = Object.keys(playerChanges);
      const uniquePositions = new Set(allPositions);

      const allPlayerConditionActions: Record<string, ConditionChangeAction> =
        {};

      uniquePositions.forEach((pos) => {
        allPlayerConditionActions[pos] = new ConditionChangeAction(
          Actor.PLAYER,
          BattleActionHelper.getActorName(
            battleData['boss'],
            battleData['party'],
            Actor.PLAYER,
            Number(pos),
          ),
          0,
          !isBossAttackPhase,
          [],
          [],
          [],
        );
      });

      allPositions.forEach((position) => {
        playerChanges[position].forEach((change) => {
          let destination: GodsightCondition[] = [];
          const missPool: GodsightCondition[] = [];
          let type = GodsightStatusType.UNKNOWN;
          switch (String(change['type'])) {
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
              console.error(
                'Boss debuff status types in player list? Must be wrong classification.',
              );
              break;
            default:
              if (change['miss'] !== undefined && change['miss'] > 0) {
                destination = missPool;
                allPlayerConditionActions[position].missCount += 1;
              } else {
                type = GodsightStatusType.UNKNOWN;
                destination = allPlayerConditionActions[position].unclassified;
                break;
              }
              break;
          }

          if (change['text']) {
            destination.push({
              'name': change['text'],
              'type': type,
              'icon': change['status'] ? `${change['status']}` : null,
              'dispelled': 'dispel' in change && change['dispel'] == 1,
            });
          }
        });
      });

      Object.keys(allPlayerConditionActions).forEach((pos) => {
        if (
          allPlayerConditionActions[pos].buffs.length ||
          allPlayerConditionActions[pos].debuffs.length ||
          allPlayerConditionActions[pos].unclassified.length
        ) {
          actions.push(allPlayerConditionActions[pos]);
        }
      });
    }

    return actions;
  }

  private getGodsightPartyMemberData(
    character: PartyMemberData,
    mainCharacterNameOverride: string,
  ): GodsightPartyMemberData {
    const isMC = Boolean(character['leader']);
    let name = character['name'];
    if (isMC && mainCharacterNameOverride) {
      name = mainCharacterNameOverride;
    }

    return {
      'name': name,
      'characterId': String(character['setting_id']),
      'isMC': Boolean(character['leader']),
      /**
       * Portrait filename to be used in the URL.
       */
      'portraitImageId': character['pid_image'],
      'hpMax': character['hpmax'],
      'hp': character['hp'],
      'meter': character['recast'],
      'meterMax': Number(character['recastmax']),
      'element': character['attr'],
      'weaponProficiency': character['weapon'],
      'alive': Boolean(character['alive']),
      'buffCount': (character['condition']['buff'] || []).length,
      'debuffCount': (character['condition']['debuff'] || []).length,
      'canBeResurrected': character['resurrection_availble_flag'], // sic
      'isGuarding': Boolean(Number(character['is_guard_status'])),
      'canGuard': !Number(character['is_guard_unavailable']),
      'isVanished': Boolean(character['is_vanished']),
    };
  }

  /**
   * For Tower of Babyl parties only.
   * We fold the extra parties into one big party,
   * but this means we have to offset character indexes
   * whenever we deal with them. Which is basically
   * only when constructing party formations, as afterwards
   * the standard 'pos' field on commands will line
   * up with our constructed `frontline` and `members` layouts.
   */
  private computeCharacterIndexOffset(
    currentPartyId: number,
    extraPartyData: Record<string | number, GodsightPartyMemberData[]>,
  ): number {
    let pid = currentPartyId - 1;
    let lowerNumberParty = extraPartyData[pid];
    let offset = 0;
    while (pid >= 0) {
      offset += lowerNumberParty ? lowerNumberParty.length : 0;
      lowerNumberParty = extraPartyData[--pid];
    }

    return offset;
  }

  public parseStartData(
    startData: StartData,
    mainCharacterNameOverride: string,
  ): GodsightBattleData {
    const party = {
      'partyMemberCount': startData['player']['number'],
      'frontline': startData['formation'].map((idx) => Number(idx)),
      'backline': startData['back_formation'].map((idx) => Number(idx)),
      'members': startData['player']['param'].map((character) =>
        this.getGodsightPartyMemberData(character, mainCharacterNameOverride),
      ),
    };

    const babylFormations = startData['tower_formation']
      ? (Object.assign(
          {},
          ...Object.keys(startData['tower_formation']).map((stringPartyId) => {
            const partyId = Number(stringPartyId);
            return {
              [partyId]: startData['tower_formation']![partyId].map((idx) => {
                if (partyId != 1) {
                  return Number(idx) - 1;
                } else {
                  return Number(idx);
                }
              }),
            };
          }),
        ) as Record<string | number, number[]>)
      : undefined;

    const battleData: GodsightBattleData = {
      'raidId': startData['raid_id'],
      'questId': startData['quest_id'],
      'IsCoopRaid': startData['is_coopraid'],
      'isHost': startData['is_host'],
      'currentTurn': Number(startData['turn']),
      /**
       * We only receive commands that tell us about increases to this value and not the current value.
       */
      'honors': 0,
      'battleStats': StatsUpdateHelper.getEmptyStatsUpdate(
        party['partyMemberCount'],
      ),
      'fatedChainGauge': Number(startData['chain_burst_gauge'] || 0),
      'battleProgressStatus': BattleProgressStatus.ACTIVE,
      'isBabyl': !!startData['tower_party'],
      'currentBabylParty':
        startData['tower_front_party_num'] !== undefined
          ? startData['tower_front_party_num']
          : undefined,
      'babylFormations': babylFormations,
      /**
       * If we miss a battle finish action while Godsight is closed,
       * we can use this time reference to determine if it has already expired.
       */
      'expirationTime': Date.now() + startData['timer'] * 1000,
      'lastUpdated': Date.now(),
      'currentWave':
        (startData['battle'] && Number(startData['battle']['count'])) || 1,
      'totalWaves':
        (startData['battle'] && Number(startData['battle']['total'])) || 1,
      'abilityTurns': [0],
      'turnsWithSkippedOrRecordedAttackActions': [],
      'party': party,
      'lyriaIndex': startData['lyria_num'],
      'summons': startData['summon'].map((gbfSummon) => {
        const cooldown = Number(gbfSummon['recast']);
        const summon: GodsightSummonData = {
          'name': gbfSummon['name'],
          'callName': gbfSummon['skill'],
          'description': gbfSummon['comment'],
          'cooldown': cooldown,
        };
        return summon;
      }),
      'supportSummon': startData['supporter']
        ? {
            'name': startData['supporter']['name'],
            'callName': startData['supporter']['skill'],
            'description': startData['supporter']['comment'],
            'cooldown': Number(startData['supporter']['recast']),
          }
        : undefined,
      'boss': startData['boss']['param'].map((b) => this.getBossData(b)),
      'turnData': {},
    };

    if (startData['tower_party']) {
      // Tower of Babyl extra parties. Fold into one party,
      // correct any data that was off.
      const extraParties = startData['tower_party']['param'];
      const currentBacklineExtraPartyIds = Object.keys(extraParties).map((i) =>
        Number(i),
      );
      const currentPartyId = battleData['currentBabylParty']!;

      const partyData: Record<string | number, GodsightPartyMemberData[]> = {};
      const allPartyMembers: GodsightPartyMemberData[] = [];

      currentBacklineExtraPartyIds.forEach((id) => {
        partyData[id] = [];
        Object.values(extraParties[id]).map((gbfChar) => {
          if (typeof gbfChar == 'object') {
            const char = this.getGodsightPartyMemberData(
              gbfChar,
              mainCharacterNameOverride,
            );
            partyData[id].push(char);
            allPartyMembers.push(char);
          }
        });
      });

      // MC is included invisibly in parties 2 and 3 (to enable summon calls?),
      // but only if those parties are in the frontline. Remove them.
      const currentParty: GodsightPartyMemberData[] = [];
      if (currentPartyId != 1) {
        currentParty.push(...battleData['party']['members'].slice(1));
        party['partyMemberCount'] = currentParty.length;
        party['frontline'] = range(0, party['partyMemberCount'] - 1);
      } else {
        currentParty.push(...battleData['party']['members']);
      }
      allPartyMembers.push(...currentParty);

      partyData[currentPartyId] = currentParty;

      party['partyMemberCount'] = allPartyMembers.length;
      party['members'] = [];

      let index = 0;
      [1, 2, 3].map((partyId) => {
        const babylParty = partyData[partyId];
        if (babylParty) {
          babylParty.forEach((char) => {
            party['members'][index] = char;
            index++;
          });
        }
      });

      const frontlineOffset = this.computeCharacterIndexOffset(
        currentPartyId,
        partyData,
      );

      party['frontline'] = party['frontline'].map(
        (charIdx) => charIdx + frontlineOffset,
      );
      party['backline'] = range(0, party['partyMemberCount'] - 1).filter(
        (id) => !party['frontline'].includes(id),
      );

      battleData['babylParties'] = partyData;

      battleData['battleStats'] = StatsUpdateHelper.getEmptyStatsUpdate(
        party['partyMemberCount'],
      );
    }

    // Bosses can start the battle with actions, reflected in the "scenario" field.
    // It's empty when loading into a raid in the middle of some arbitrary turn,
    // so if we have a non-empty scenario, our convention is that those entries belong to turn 0.
    // In gameplay terms, they actually belong to turn 1, as can be seen via certain character passives.
    if (startData['scenario'].length) {
      battleData['currentTurn'] = 0;
      const actions = this.parseScenarioData(
        startData['scenario'],
        startData,
        battleData,
      );
      battleData['turnData'][0] = this.processTurnActionData(actions, party);

      // Update stats.
      StatsUpdateHelper.mergeStats(
        battleData['turnData'][0]['turnStats'],
        battleData['battleStats']['generalStats'],
      );
      Object.keys(
        battleData['turnData'][0]['characterCurrentTurnStats'],
      ).forEach((characterIndex) => {
        StatsUpdateHelper.mergeStats(
          battleData['turnData'][0]['characterCurrentTurnStats'][
            characterIndex
          ],
          battleData['battleStats']['characterStats'][characterIndex],
        );
      });
    }

    return battleData;
  }

  public processTurnActionData(
    battleActions: BattleAction[],
    party: GodsightPartyFormationData,
  ): TurnData {
    const baseStats = StatsUpdateHelper.getEmptyStatsUpdate(
      party['partyMemberCount'],
    );
    const statUpdates = battleActions.map((action) => action.getStats());
    const totalStats = statUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      baseStats,
    );

    return {
      'turnStats': totalStats['generalStats'],
      'beforeBossTurnStats': totalStats['beforeBossTurnStats'],
      'characterCurrentTurnStats': totalStats['characterStats'],
      'characterBeforeBossTurnStats':
        totalStats['characterBeforeBossTurnStats'],
      'turnActions': battleActions,
    };
  }

  public updateSummonCooldowns(
    godsightBattleData: GodsightBattleData,
    gbfBattleData: GranblueBattleData,
  ): void {
    if (gbfBattleData['status']) {
      gbfBattleData['status']['summon'].forEach((summon, idx) => {
        const matchingBattleDataSummon = godsightBattleData['summons'][idx];
        matchingBattleDataSummon['cooldown'] = Number(summon['recast']);
      });
    }
    if (
      godsightBattleData['supportSummon'] &&
      gbfBattleData['status'] &&
      gbfBattleData['status']['supporter']
    ) {
      godsightBattleData['supportSummon']['cooldown'] = Number(
        gbfBattleData['status']['supporter']['recast'],
      );
    }
  }

  private getBossData(b: BossData): GodsightBossData {
    const maxDiamonds = Number(b['recastmax']);
    const currentDiamonds = Number(b['recast']);
    const currentHp = Number(b['hp']);

    const godsightBossData: GodsightBossData = {
      'name': b['name']['en'],
      'element': b['attr'],
      'hpCurrent': currentHp,
      'hpMax': Number(b['hpmax']),
      'maxDiamonds': isNaN(maxDiamonds) ? 0 : maxDiamonds - 1,
      // For some reason empty diamonds is set to max in data, and it counts down to 1 as diamonds fill.
      'currentDiamonds': isNaN(maxDiamonds) ? 0 : maxDiamonds - currentDiamonds,
    };

    return godsightBossData;
  }

  private getBossDataFromBossStatusScenario(
    b: BossStatusScenarioData,
    existingData: GodsightBossData,
  ): GodsightBossData {
    const maxDiamonds = Number(b['recastmax']);
    const currentDiamonds = Number(b['recast']);

    const godsightBossData: GodsightBossData = {
      'name': b['name']['en'],
      'element': b['attr'],
      'hpCurrent': b['hp'],
      'hpMax': existingData['hpMax'],
      'maxDiamonds': isNaN(maxDiamonds) ? 0 : maxDiamonds - 1,
      // For some reason empty diamonds is set to max in data, and it counts down to 1 as diamonds fill.
      'currentDiamonds': isNaN(maxDiamonds) ? 0 : maxDiamonds - currentDiamonds,
    };

    return godsightBossData;
  }

  private getBossDataFromFormChangeScenario(
    b: FormChangeScenarioData,
    existingData: GodsightBossData,
  ): GodsightBossData {
    const godsightBossData: GodsightBossData = {
      'name': b['param']['name']['en'],
      'element': b['param']['attr'],
      'hpCurrent': existingData['hpCurrent'],
      'hpMax': existingData['hpMax'],
      'maxDiamonds': existingData['maxDiamonds'],
      'currentDiamonds': existingData['currentDiamonds'],
    };

    return godsightBossData;
  }
}
