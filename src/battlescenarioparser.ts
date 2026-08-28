import { AbilityScenarioData } from "./gbf/battletypes/scenariodata/abilityscenariodata";
import { BossSpecialAttackScenarioData } from "./gbf/battletypes/scenariodata/bossspecialattackscenariodata";
import { BossStatusScenarioData } from "./gbf/battletypes/scenariodata/bossstatusscenariodata";
import { ChargeAttackMeterChangedScenarioData } from "./gbf/battletypes/scenariodata/chargeattackmeterchangedscenariodata";
import { ChargedAttackDamageInstance, ChargedAttackScenarioData } from "./gbf/battletypes/scenariodata/chargedattackscenariodata";
import { DamageScenarioData } from "./gbf/battletypes/scenariodata/damagescenariodata";
import { DeathScenarioData } from "./gbf/battletypes/scenariodata/deathscenariodata";
import { FatedChainGaugeScenarioData } from "./gbf/battletypes/scenariodata/fatedchaingaugescenariodata";
import { FormChangeScenarioData } from "./gbf/battletypes/scenariodata/formchangescenariodata";
import { FullElixirScenarioData } from "./gbf/battletypes/scenariodata/fullelixirscenariodata";
import { GenericScenarioData } from "./gbf/battletypes/scenariodata/genericscenariodata";
import { HonorsGainedScenarioData } from "./gbf/battletypes/scenariodata/honorsgainedscenariodata";
import { HPChangedScenarioData } from "./gbf/battletypes/scenariodata/hpchangedscenariodata";
import { GameElementHelper, GameElementValue } from "./gbf/battletypes/scenariodata/mechanics/element";
import { StatusType } from "./gbf/battletypes/scenariodata/mechanics/statustype";
import { Target } from "./gbf/battletypes/scenariodata/mechanics/target";
import { MessageScenarioData } from "./gbf/battletypes/scenariodata/messagescenariodata";
import { MultihitDamageScenarioData, TotalDamageDealt } from "./gbf/battletypes/scenariodata/multihitdamagescenariodata";
import { NormalAttackDamage, NormalAttackScenarioData } from "./gbf/battletypes/scenariodata/normalattackscenariodata";
import { ReplaceCharacterScenarioData } from "./gbf/battletypes/scenariodata/replacecharacterscenariodata";
import { ScenarioCommand } from "./gbf/battletypes/scenariodata/scenariocommand";
import { HealingScenarioData } from "./gbf/battletypes/scenariodata/healingscenariodata";
import { WindowEffectScenarioData } from "./gbf/battletypes/scenariodata/windoweffectscenariodata";
import { BossData, StartData } from "./gbf/battletypes/startdata";
import { AbilityAction } from "./godsight/battletypes/abilityaction";
import { ActionType } from "./godsight/battletypes/actiontype";
import { BattleAction } from "./godsight/battletypes/battleaction";
import { GodsightBattleData } from "./godsight/battletypes/battledata";
import { GodsightBossData } from "./godsight/battletypes/bossdata";
import { BossSpecialAttackAction } from "./godsight/battletypes/bossspecialattackaction";
import { CAMeterChangedAction } from "./godsight/battletypes/cameterchangedaction";
import { ChargedAttackAction } from "./godsight/battletypes/chargedattackaction";
import { GodsightCondition, ConditionChangeAction } from "./godsight/battletypes/conditionchangeaction";
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
import { BattleProgressStatus } from "./godsight/battletypes/battlestatus";
import { WonBattleScenarioData } from "./gbf/battletypes/scenariodata/wonbattlescenariodata";
import { ChainBurstScenarioData } from "./gbf/battletypes/scenariodata/chainburstscenariodata";
import { ChainBurstAction } from "./godsight/battletypes/chainburstaction";
import { ScreenEffectScenarioData } from "./gbf/battletypes/scenariodata/screeneffectscenariodata";

export class BattleScenarioParser {
  constructor() {

  }

  /**
   * Parses game battle scenario data.
   * @param scenarioData The data to process
   * @param battleData Main info about the battle, such as boss and party member status.
   * @returns a list of actions describing the scenario.
   */
  public parseScenarioData(
    scenarioData: GenericScenarioData[],
    battleData: GodsightBattleData,
  ): BattleAction[] {
    return this._parseScenarioData(scenarioData, battleData).actions;
  }

  private containsJapaneseRegex = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;

  /**
   * Parses game battle scenario data.
   * @param scenarioData The data to process
   * @param battleData Main info about the battle, such as boss and party member status.
   * @param stopOnMainAction Used when calling the method recursively to stop when a "separate" action is reached while processing subactions.
   * @returns a list of actions and the last index processed in the array.
   */
  private _parseScenarioData(
    scenarioData: GenericScenarioData[],
    battleData: GodsightBattleData,
    stopOnMainAction?: boolean
  ): { actions: BattleAction[], lastIndex: number } {
    const actions: BattleAction[] = [];
    let i = 0;
    baseLoop: for (; i < scenarioData.length; i++) {
      const scenario = scenarioData[i];
      switch (scenario["cmd"]) {

        case ScenarioCommand.BOSS_STATUS:
          // Updates battle data rather than recording an action.
          this.handleBossStatusScenario(scenario as BossStatusScenarioData, battleData);
          break;

        case ScenarioCommand.FORM_CHANGE:
          // Updates battle data rather than recording an action.
          this.handleFormChangeScenario(scenario as FormChangeScenarioData, battleData);
          break;

        case ScenarioCommand.BOSS_SPECIAL_ATTACK: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const bossSpecialAttackScenario = scenario as BossSpecialAttackScenarioData;
          const subactions = this._parseScenarioData(scenarioData.slice(i + 1), battleData, stopOnMainAction);
          const bossSpecialAttackAction: BossSpecialAttackAction = {
            "action": ActionType.BOSS_SPECIAL_ATTACK,
            "name": bossSpecialAttackScenario["name"],
            "count": bossSpecialAttackScenario["count"],
            "element": bossSpecialAttackScenario["attr"],
            "source": battleData["boss"][bossSpecialAttackScenario["pos"]]["name"],
            "target": bossSpecialAttackScenario["target"],
            "damageInstances": bossSpecialAttackScenario["list"].flatMap(l => l["damage"]).map(instance => {
              const damageInstance: DamageInstance = {
                "element": instance["attr"],
                "position": instance["pos"],
                "value": instance["value"],
                "targetHpAfterDamage": instance["hp"],
                "critical": instance["critical"],
                "miss": instance["miss"],
                "guarded": instance["guard"],
              }
              return damageInstance;
            }),
            // Peek ahead at further scenarios to find out the consequences of this one, so we can associate them.
            "subactions": subactions.actions,
          };
          actions.push(bossSpecialAttackAction);
          // Skip ahead past actions we already included as subactions.
          i += subactions.lastIndex;
          break;
        }

        case ScenarioCommand.CA_METER_CHANGED:
          const meterChangeScenario = scenario as ChargeAttackMeterChangedScenarioData;
          actions.push(this.handleMeterChangeScenario(meterChangeScenario, battleData));
          break;

        case ScenarioCommand.MESSAGE:
          const buffDebuffChangeScenario = scenario as MessageScenarioData;
          actions.push(...this.handleMessageScenario(buffDebuffChangeScenario));
          break;

        case ScenarioCommand.DEATH:
          const deathScenario = scenario as DeathScenarioData;
          actions.push(this.handleDeathScenario(deathScenario));
          break;

        case ScenarioCommand.ABILITY: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const abilityScenario = scenario as AbilityScenarioData;
          const subactions = this._parseScenarioData(scenarioData.slice(i + 1), battleData, stopOnMainAction);
          if (subactions.actions.length == 0) {
            // Sometimes we have empty ability commands followed by real ones, dunno why, the client is weird.
            // The real ability command should happen next so just break and continue the loop.
            break;
          }
          const abilityAction: AbilityAction = {
            "action": ActionType.ACTIVATED_ABILITY,
            "name": abilityScenario["name"],
            "source": abilityScenario["to"],
            "position": abilityScenario["pos"],
            "subactions": subactions.actions,
          }
          // Fix some abilities activating without names (or with untranslated names) in the ability itself
          // but the correct name shows up in subactions.
          if (!abilityAction["name"] || this.containsJapaneseRegex.test(abilityAction["name"])) {
            const windowSubactions = abilityAction["subactions"].filter(a => a["action"] == ActionType.WINDOW_EFFECT) as WindowEffectAction[];
            const firstNamedWindowSubaction = windowSubactions.find(a =>
              a["name"] && !this.containsJapaneseRegex.test(a["name"])
            );
            if (firstNamedWindowSubaction) {
              abilityAction["name"] = firstNamedWindowSubaction["name"];
              // TODO: filter out subaction used for name?
            }
          }
          actions.push(abilityAction);
          // Skip ahead past actions we already included as subactions.
          i += subactions.lastIndex;
          break;
        }

        case ScenarioCommand.HONORS_GAINED:
          const honorsGainedScenario = scenario as HonorsGainedScenarioData;
          battleData["honors"] += honorsGainedScenario["amount"];
          break;

        case ScenarioCommand.REPLACE_CHARACTER:
          if (stopOnMainAction) {
            break baseLoop;
          }
          const replaceCharacterScenario = scenario as ReplaceCharacterScenarioData;
          const position = replaceCharacterScenario["pos"];
          const newCharacter = Number(replaceCharacterScenario["npc"]);
          const replaceCharacterAction: ReplaceCharacterAction = {
            "action": ActionType.REPLACED_CHARACTER,
            "position": position,
            "newCharacter": newCharacter,
          };
          actions.push(replaceCharacterAction);
          // TODO: test logic with Tactical Relocation, assuming it's the same command.
          // const currentCharacterAtPos = battleData["party"]["frontline"][position];
          // battleData["party"]["frontline"][position] = newCharacter;
          break;

        case ScenarioCommand.WINDOW_EFFECT:
          const windowScenario = scenario as WindowEffectScenarioData;
          const windowAction: WindowEffectAction = {
            "action": ActionType.WINDOW_EFFECT,
            "name": windowScenario["name"],
          };
          actions.push(windowAction);
          break;

        case ScenarioCommand.DAMAGE_DEALT:
          const damageDealtScenario = scenario as DamageScenarioData;
          const damageAction: DamageAction = {
            "action": ActionType.DAMAGE_DEALT,
            "element": damageDealtScenario["color"],
            "target": damageDealtScenario["to"],
            "instances": damageDealtScenario["list"].map(l => {
              return {
                "position": l["pos"],
                "currentHit": l["attack_num"],
                "element": l["color"],
                "value": l["value"],
                "targetHpAfterDamage": l["hp"],
                "critical": l["critical"],
                "guarded": l["guard"],
                "miss": l["miss"],
              };
            }),
          };
          actions.push(damageAction);
          break;

        case ScenarioCommand.DAMAGE_DEALT_MULTIHIT:
          const multihitDamageScenario = scenario as MultihitDamageScenarioData;
          const multihitDamageAction: MultihitDamageAction = {
            "action": ActionType.DAMAGE_DEALT_MULTIHIT,
            "element": multihitDamageScenario["color"],
            "target": multihitDamageScenario["to"],
            "hits": multihitDamageScenario["list"].flat(1).map(hit => {
              return {
                "element": hit["color"],
                "position": hit["pos"],
                "value": hit["value"],
                "targetHpAfterDamage": hit["hp"],
                "critical": hit["critical"],
                "guarded": hit["guard"],
                "miss": hit["miss"],
              };
            }),
            "totals": multihitDamageScenario["total"].map(t => TotalDamageDealt.getTotal(t)),
          };
          actions.push(multihitDamageAction);
          break;

        case ScenarioCommand.NORMAL_ATTACK_START: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const subactions = this._parseScenarioData(scenarioData.slice(i + 1), battleData, stopOnMainAction);
          const normalAttackAction: NormalAttackAction = {
            "action": ActionType.NORMAL_ATTACK,
            "subactions": subactions.actions,
          };
          actions.push(normalAttackAction);
          i += subactions.lastIndex;
          break;
        }

        case ScenarioCommand.NORMAL_ATTACK_END:
          if (stopOnMainAction) {
            break baseLoop;
          }
          break;

        case ScenarioCommand.NORMAL_ATTACK:
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
          const singularNormalAttackAction: SingularNormalAttackAction = {
            "action": ActionType.SINGULAR_NORMAL_ATTACK,
            "from": singularNormalAttackScenario["from"],
            "attackerPosition": singularNormalAttackScenario["pos"],
            "targetPosition": singularNormalAttackScenario["num"],
            "element": singularNormalAttackScenario["color"],
            "damage": damageArray.map(damage => {
              return {
                "element": damage["color"],
                "position": damage["pos"],
                "value": damage["value"],
                "targetHpAfterDamage": damage["hp"],
                "critical": damage["critical"],
                "guarded": damage["guard"],
                "miss": damage["miss"],
              };
            }),
          };
          actions.push(singularNormalAttackAction);
          break;

        case ScenarioCommand.MC_CHARGED_ATTACK:
        case ScenarioCommand.CHARACTER_CHARGED_ATTACK: {
          if (stopOnMainAction) {
            break baseLoop;
          }
          const chargedAttackScenario = scenario as ChargedAttackScenarioData;
          const wasCriticalHit: Map<GameElementValue, boolean> = new Map();
          const allSplitChargedAttackDamage = chargedAttackScenario["list"].flatMap(l => l["damage"]);
          allSplitChargedAttackDamage.forEach(d => {
            if (d["critical"]) {
              wasCriticalHit.set(d["attr"], true);
            }
          });
          const hpAfterDamage = allSplitChargedAttackDamage[-1]["hp"];
          const subactions = this._parseScenarioData(scenarioData.slice(i + 1), battleData, stopOnMainAction);
          const chargedAttackAction: ChargedAttackAction = {
            "action": ActionType.CHARGED_ATTACK,
            "name": chargedAttackScenario["name"],
            "element": chargedAttackScenario["attr"],
            "position": chargedAttackScenario["pos"],
            "targetPosition": chargedAttackScenario["to"],
            "target": chargedAttackScenario["target"],
            "damageTotals": chargedAttackScenario["total"].map(damage => {
              const damageTotal = ChargedAttackDamageInstance.getTotal(damage);
              return {
                "element": damage["attr"],
                "value": damageTotal,
                "critical": wasCriticalHit.get(damage["attr"])!,
                "position": damage["pos"],
                "targetHpAfterDamage": hpAfterDamage,
                "miss": damageTotal > 0 ? 0 : 2,
                "guarded": false,
              };
            }),
            "subactions": subactions.actions,
          };
          actions.push(chargedAttackAction);
          i += subactions.lastIndex;
          break;
        }

        case ScenarioCommand.FATED_CHAIN_GAUGE_CHANGE:
          const fatedChainGaugeScenario = scenario as FatedChainGaugeScenarioData;
          battleData["fatedChainGauge"] = fatedChainGaugeScenario["value"];
          break;

        case ScenarioCommand.FULL_ELIXIR: {
          // You can't use a full elixir in the middle of a turn, it's always its own button press,
          // so all subsequent commands like increasing character meter and reviving are subactions.
          const subactions = this._parseScenarioData(scenarioData.slice(i + 1), battleData);
          const fullElixirAction: FullElixirAction = {
            "action": ActionType.USED_FULL_ELIXIR,
            "subactions": subactions.actions,
          };
          actions.push(fullElixirAction);
          break baseLoop;
        }

        case ScenarioCommand.HEALING:
          const healingScenario = scenario as HealingScenarioData;
          const healingAction: HealingAction = {
            "action": ActionType.HEAL,
            "target": healingScenario["to"],
            "healingInstances": healingScenario["list"].map(h => {
              return {
                "position": h["pos"],
                "value": h["value"],
                "hpAfterHealing": h["hp"],
              };
            })
          };
          actions.push(healingAction);
          break;

        case ScenarioCommand.SUMMON:
          const summonScenario = scenario as SummonScenarioData;
          const subactions = this._parseScenarioData(scenarioData.slice(i + 1), battleData, true);
          const summonAction: SummonAction = {
            "action": ActionType.CALLED_SUMMON,
            "name": summonScenario["name"],
            "damageInstances": summonScenario["list"].flatMap(l => l["damage"]).map(damage => {
              return {
                "position": damage["pos"],
                "element": damage["color"],
                "value": damage["value"],
                "targetHpAfterDamage": damage["hp"],
                "critical": damage["critical"],
                "guarded": damage["guard"],
                // TODO: test this.
                // I feel like it should be possible for summons to miss vs e.g. Siete unchallenged
                // but maybe that just shows up as damage = 0.
                "miss": 0,
              }
            }),
            "subactions": subactions.actions,
          };
          actions.push(summonAction);
          i += subactions.lastIndex;
          break;

        case ScenarioCommand.CHAIN_BURST:
          if (stopOnMainAction) {
            break baseLoop;
          }
          const chainBurstScenario = scenario as ChainBurstScenarioData;
          const chainBurstAction: ChainBurstAction = {
            "action": ActionType.CHAIN_BURST,
            "chainCount": chainBurstScenario["chain_num"],
            "name": "Unknown",
            "damageInstances": [],
          };
          // A CHAIN_BURST command should be immediately followed by _SCREEN_EFFECT
          // with its name and a DAMAGE_DEALT or DAMAGE_DEALT_MULTIHIT command
          // (the latter is solely for special multihit chainbursts like Higurashi's)
          const screenEffectScenario = scenarioData[i + 1];
          const chainBurstDamageScenario = scenarioData[i + 2];
          if (screenEffectScenario["cmd"] == ScenarioCommand._SCREEN_EFFECT) {
            chainBurstAction["name"] = (screenEffectScenario as ScreenEffectScenarioData)["name"];
            // Make sure to skip the command since we already processed it.
            i += 1;
          }
          if (chainBurstDamageScenario["cmd"] == ScenarioCommand.DAMAGE_DEALT) {
            const damageScenario = chainBurstDamageScenario as DamageScenarioData;
            chainBurstAction["damageInstances"] = damageScenario["list"].map(d => {
              return {
                "element": d["color"],
                "position": d["pos"],
                "value": d["value"],
                "targetHpAfterDamage": d["hp"],
                "critical": d["critical"],
                "miss": d["miss"],
                "guarded": d["guard"],
              };
            });
            // Make sure to skip the command since we already processed it.
            i += 1;
          } else if (chainBurstDamageScenario["cmd"] == ScenarioCommand.DAMAGE_DEALT_MULTIHIT) {
            const multihitDamageScenario = chainBurstDamageScenario as MultihitDamageScenarioData;
            chainBurstAction["damageInstances"] = multihitDamageScenario["list"].flat(1).map(d => {
              return {
                "element": d["color"],
                "position": d["pos"],
                "value": d["value"],
                "targetHpAfterDamage": d["hp"],
                "critical": d["critical"],
                "miss": d["miss"],
                "guarded": d["guard"],
              };
            });
            // Make sure to skip the command since we already processed it.
            i += 1;
          }
          actions.push(chainBurstAction);
          break;

        case ScenarioCommand.RETREAT:
          battleData["battleProgressStatus"] = BattleProgressStatus.RETREATED;
          break baseLoop;

        case ScenarioCommand.WON_BATTLE:
          const wonBattleScenario = scenario as WonBattleScenarioData;
          if (wonBattleScenario["is_last_raid"]) {
            battleData["battleProgressStatus"] = BattleProgressStatus.WON;
          }
          break;


        case ScenarioCommand._TURN:
          if (stopOnMainAction) {
            break baseLoop;
          }
          break;

        // All of these commands are recognized but ignored.
        case ScenarioCommand._POTIONS_CHANGED:
        case ScenarioCommand._HP_CHANGED:
        case ScenarioCommand._SPECIAL_CHANGE:
        case ScenarioCommand._CONDITION:
        case ScenarioCommand._SCREEN_EFFECT:
        case ScenarioCommand._BGM:
        case ScenarioCommand._BATTLE_LOG:
        case ScenarioCommand._MODE_CHANGE:
          break;
        default:
          console.trace(`Unhandled command ${scenario["cmd"]}`);
          break;
      }
    }

    return {
      lastIndex: i,
      actions,
    };
  }

  private handleDeathScenario(deathScenario: DeathScenarioData): BattleAction {
    const action: DeathAction = {
      "action": ActionType.DEATH,
      "target": deathScenario["to"],
      "position": deathScenario["pos"],
      "index": typeof deathScenario["index"] === "number" ? deathScenario["index"] : undefined,
    };

    return action;
  }

  private handleFormChangeScenario(formChangeScenario: FormChangeScenarioData, battleData: GodsightBattleData): void {
    if (formChangeScenario["to"] == Target.BOSS) {
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
    battleData: GodsightBattleData
  ): BattleAction {
    const position = meterChangeScenario["pos"];
    const target = meterChangeScenario["to"];
    let newValue = meterChangeScenario["value"];
    let initialValue = newValue;
    if (target == Target.PLAYER) {
      const allyIndex = battleData["party"]["frontline"][position];
      const targetAlly = battleData["party"]["members"][allyIndex];
      initialValue = targetAlly.meter;

      targetAlly["meter"] = newValue;
    } else {
      const boss = battleData["boss"][position];
      initialValue = boss["currentDiamonds"];

      boss["currentDiamonds"] = boss["maxDiamonds"] - newValue;
    }

    const action: CAMeterChangedAction = {
      "action": ActionType.CA_METER_CHANGED,
      "target": target,
      "position": position,
      "newValue": newValue,
      "change": newValue - initialValue,
    };

    return action;
  }

  private handleMessageScenario(buffDebuffChangeScenario: MessageScenarioData): BattleAction[] {
    const actions: BattleAction[] = [];

    // Buffs and debuffs changed.
    const bossChanges = buffDebuffChangeScenario["data"]["boss"]
    const playerChanges = buffDebuffChangeScenario["data"]["player"]
    if (bossChanges) {
      const allBossChanges = bossChanges.flat(1);
      const uniquePositions = new Set(allBossChanges.map(b => b["pos"]));

      const allBossConditionActions: { [key: string]: ConditionChangeAction } = {};

      uniquePositions.forEach(pos => {
        allBossConditionActions[pos] = {
          "action": ActionType.CONDITION_CHANGED,
          "target": Target.BOSS,
          "position": pos,
          "buffs": [],
          "debuffs": [],
          "unclassified": [],
        };
      });

      allBossChanges.forEach(change => {
        const position = change["pos"];
        let destination = [];
        switch (String(change["type"])) {
          case StatusType.PLAYER_BUFF:
            console.error("Player debuff status type in boss list? Must be wrong classification.");
            break;
          case StatusType.GLOBAL_DEBUFF_OR_PLAYER_DEBUFF:
          case StatusType.LOCAL_BOSS_DEBUFF:
            destination = allBossConditionActions[position]["debuffs"];
            break;
          case StatusType.LOCAL_BOSS_BUFF:
            destination = allBossConditionActions[position]["buffs"];
            break;
          default:
            destination = allBossConditionActions[position]["unclassified"];
            break;
        }

        destination.push({
          "name": change["text"],
          "type": change["type"],
          "icon": change["status"],
        });
      });

      Object.keys(allBossConditionActions).forEach(pos => {
        actions.push(allBossConditionActions[pos]);
      });
    }
    if (playerChanges) {
      const allPositions = Object.keys(playerChanges);
      const uniquePositions = new Set(allPositions);

      const allPlayerConditionActions: { [key: string]: ConditionChangeAction } = {};

      uniquePositions.forEach(pos => {
        allPlayerConditionActions[pos] = {
          "action": ActionType.CONDITION_CHANGED,
          "target": Target.PLAYER,
          "position": Number(pos),
          "buffs": [],
          "debuffs": [],
          "unclassified": [],
        };
      });

      allPositions.forEach(position => {
        playerChanges[position].forEach(change => {
          let destination = [];
          switch (String(change["type"])) {
            case StatusType.PLAYER_BUFF:
              destination = allPlayerConditionActions[position]["buffs"];
              break;
            case StatusType.GLOBAL_DEBUFF_OR_PLAYER_DEBUFF:
              destination = allPlayerConditionActions[position]["debuffs"];
              break;
            case StatusType.LOCAL_BOSS_DEBUFF:
            case StatusType.LOCAL_BOSS_BUFF:
              console.error("Boss debuff status types in player list? Must be wrong classification.");
              break;
            default:
              destination = allPlayerConditionActions[position]["unclassified"];
              break;
          }

          destination.push({
            "name": change["text"],
            "type": change["type"],
            "icon": change["status"],
          });
        });
      });

      Object.keys(allPlayerConditionActions).forEach(pos => {
        actions.push(allPlayerConditionActions[pos]);
      });
    }

    return actions;
  }

  public parseStartData(startData: StartData): GodsightBattleData {
    const battleData: GodsightBattleData = {
      "raidId": startData["raid_id"],
      "questId": startData["quest_id"],
      "IsCoopRaid": startData["is_coopraid"],
      "isHost": startData["is_host"],
      "currentTurn": startData["turn"],
      /**
       * We only receive commands that tell us about increases to this value and not the current value.
       */
      "honors": 0,
      "fatedChainGauge": Number(startData["status"]["chain_burst_gauge"] || 0),
      "battleProgressStatus": BattleProgressStatus.ACTIVE,
      /**
       * If we miss a battle finish action while Godsight is closed,
       * we can use this time reference to determine if it has already expired.
       */
      "expirationTime": Date.now() + (startData["timer"] * 1000),
      "party": {
        "partyMemberCount": startData["player"]["number"],
        "frontline": startData["formation"].map(idx => Number(idx)),
        "backline": startData["back_formation"].map(idx => Number(idx)),
        "members": startData["player"]["param"].map(char => {
          return {
            "name": char["name"],
            "characterId": String(char["setting_id"]),
            "isMC": Boolean(char["leader"]),
            /**
             * Portrait filename to be used in the URL.
             */
            "portraitImageId": char["pid_image"],
            "hpMax": char["hpmax"],
            "hp": char["hp"],
            "meter": char["recast"],
            "meterMax": Number.parseInt(char["recastmax"]),
            "element": char["attr"],
            "weaponProficiency": char["weapon"],
            "alive": Boolean(char["alive"]),
            "buffCount": (char["condition"]["buff"] || []).length,
            "debuffCount": (char["condition"]["debuff"] || []).length,
            "canBeResurrected": char["resurrection_availble_flag"],
            "isGuarding": Boolean(Number.parseInt(char["is_guard_status"])),
            "canGuard": !Boolean(Number.parseInt(char["is_guard_unavailable"])),
            "isVanished": Boolean(char["is_vanished"]),
          };
        }),
      },
      "boss": startData["boss"]["param"].map((b) => this.getBossData(b)),
      "turnData": {},
    };

    // Bosses can start the battle with actions, reflected in the "scenario" field.
    // It's empty when loading into a raid in the middle of some arbitrary turn,
    // so if we have a non-empty scenario, our convention is that those entries belong to turn 0.
    if (startData["scenario"].length) {
      battleData["turnData"][0] = this.parseScenarioData(startData["scenario"], battleData);
    }

    return battleData;
  }

  private getBossData(b: BossData): GodsightBossData {
    const maxDiamonds = parseInt(b["recastmax"]);
    const currentDiamonds = parseInt(b["recast"]);
    const currentHp = parseInt(b["hp"]);

    const godsightBossData: GodsightBossData = {
      "name": b["name"]["en"],
      "element": b["attr"],
      "hpCurrent": currentHp,
      "hpMax": b["hpmax"],
      "maxDiamonds": isNaN(maxDiamonds) ? 0 : maxDiamonds,
      // For some reason empty diamonds is set to max in data, and it counts down to 0 as diamonds fill.
      "currentDiamonds": isNaN(maxDiamonds) ? 0 : maxDiamonds - currentDiamonds,
    };

    return godsightBossData;
  }

  private getBossDataFromBossStatusScenario(b: BossStatusScenarioData, existingData: GodsightBossData): GodsightBossData {
    const godsightBossData: GodsightBossData = {
      "name": b["name"]["en"],
      "element": b["attr"],
      "hpCurrent": b["hp"],
      "hpMax": existingData["hpMax"],
      "maxDiamonds": b["recastmax"],
      // For some reason empty diamonds is set to max in data, and it counts down to 0 as diamonds fill.
      "currentDiamonds": b["recastmax"] - b["recast"],
    };

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