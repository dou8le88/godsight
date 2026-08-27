import { AbilityScenarioData } from "./gbf/battletypes/scenariodata/abilityscenariodata";
import { BossSpecialAttackScenarioData } from "./gbf/battletypes/scenariodata/bossspecialattackscenariodata";
import { BossStatusScenarioData } from "./gbf/battletypes/scenariodata/bossstatusscenariodata";
import { ChargeAttackMeterChangedScenarioData } from "./gbf/battletypes/scenariodata/chargeattackmeterchangedscenariodata";
import { DamageScenarioData } from "./gbf/battletypes/scenariodata/damagescenariodata";
import { DeathScenarioData } from "./gbf/battletypes/scenariodata/deathscenariodata";
import { FormChangeScenarioData } from "./gbf/battletypes/scenariodata/formchangescenariodata";
import { GenericScenarioData } from "./gbf/battletypes/scenariodata/genericscenariodata";
import { HonorsGainedScenarioData } from "./gbf/battletypes/scenariodata/honorsgainedscenariodata";
import { HPChangedScenarioData } from "./gbf/battletypes/scenariodata/hpchangedscenariodata";
import { GameElementHelper } from "./gbf/battletypes/scenariodata/mechanics/element";
import { StatusType } from "./gbf/battletypes/scenariodata/mechanics/statustype";
import { Target } from "./gbf/battletypes/scenariodata/mechanics/target";
import { MessageScenarioData } from "./gbf/battletypes/scenariodata/messagescenariodata";
import { ReplaceCharacterScenarioData } from "./gbf/battletypes/scenariodata/replacecharacterscenariodata";
import { ScenarioCommand } from "./gbf/battletypes/scenariodata/scenariocommand";
import { WindowEffectScenarioData } from "./gbf/battletypes/scenariodata/windoweffectscenariodata";
import { BossData, StartData } from "./gbf/battletypes/startdata";
import { AbilityAction } from "./godsight/battletypes/abilityaction";
import { ActionType } from "./godsight/battletypes/actiontype";
import { BattleAction } from "./godsight/battletypes/battleaction";
import { GodsightBattleData } from "./godsight/battletypes/battledata";
import { GodsightBossData } from "./godsight/battletypes/bossdata";
import { BossSpecialAttackAction } from "./godsight/battletypes/bossspecialattackaction";
import { CAMeterChangedAction } from "./godsight/battletypes/cameterchangedaction";
import { GodsightCondition, ConditionChangeAction } from "./godsight/battletypes/conditionchangeaction";
import { DamageAction } from "./godsight/battletypes/damageaction";
import { DeathAction } from "./godsight/battletypes/deathaction";
import { ReplaceCharacterAction } from "./godsight/battletypes/replacecharacteraction";
import { WindowEffectAction } from "./godsight/battletypes/windoweffectaction";

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
              const damageInstance = {
                "element": instance["attr"],
                "position": instance["pos"],
                "value": instance["value"],
                "characterHpAfterDamage": instance["hp"],
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
            }
          }
          actions.push(abilityAction);
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
          break;

        case ScenarioCommand.NORMAL_ATTACK:
          break;

        case ScenarioCommand.MC_CHARGED_ATTACK:
          break;

        case ScenarioCommand.CHARACTER_CHARGED_ATTACK:
          break;

        case ScenarioCommand.FATED_CHAIN_GAUGE_CHANGE:
          break;

        case ScenarioCommand.FULL_ELIXIR:
          break;

        case ScenarioCommand.HEALING:
          break;

        case ScenarioCommand.POTIONS_CHANGED:
          break;

        case ScenarioCommand.SUMMON:
          break;

        case ScenarioCommand.RETREAT:
          break;

        case ScenarioCommand.WON_BATTLE:
          break;

        // All of these commands are recognized but ignored.
        case ScenarioCommand.HP_CHANGED:
        case ScenarioCommand.SPECIAL_CHANGE:
        case ScenarioCommand.CONDITION:
        case ScenarioCommand.SCREEN_EFFECT:
        case ScenarioCommand.TURN:
        case ScenarioCommand.BGM:
        case ScenarioCommand.BATTLE_LOG:
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
       * TODO: we only receive commands that tell us about increases to this value and not the current value.
       * We need to update this VS any data that may already exist.
       */
      "honors": 0,
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