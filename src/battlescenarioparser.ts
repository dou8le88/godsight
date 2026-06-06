import { StartData } from "./gbf/battletypes/startdata";
import { GodsightBattleData } from "./godsight/battletypes/battledata";

export class BattleScenarioParser {
  constructor() {

  }

  public parseStartData(startData: StartData): GodsightBattleData {
    return {
      "raidId": startData.raid_id,
      "questId": startData.quest_id,
      "IsCoopRaid": startData.is_coopraid,
      "isHost": startData.is_host,
      "turn": startData.turn,
      "party": {
        "partyMemberCount": startData.player.number,
        "frontline": startData.formation.map(idx => Number(idx)),
        "backline": startData.back_formation.map(idx => Number(idx)),
        "members": startData.player.param.map(char => {
          return {
            "name": char.name,
            "characterId": String(char.setting_id),
            "isMC": Boolean(char.leader),
            /**
             * Portrait filename to be used in the URL.
             */
            "portraitImageId": char.pid_image,
            "hpMax": char.hpmax,
            "hp": char.hp,
            "meter": char.recast,
            "meterMax": Number.parseInt(char.recastmax),
            "element": char.attr,
            "weaponProficiency": char.weapon,
            "alive": Boolean(char.alive),
            "buffCount": (char.condition.buff || []).length,
            "debuffCount": (char.condition.debuff || []).length,
            "canBeResurrected": char.resurrection_availble_flag,
            "isGuarding": Boolean(Number.parseInt(char.is_guard_status)),
            "canGuard": !Boolean(Number.parseInt(char.is_guard_unavailable)),
            "isVanished": Boolean(char.is_vanished),
          };
        }),
      },
      "boss": {},
      "actions": [],
    };
  }
}