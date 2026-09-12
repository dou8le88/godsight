import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { DamageInstance } from "./damageinstance";
import { GodsightPartyFormationData, PartyFormationHelper } from "./partyformationdata";
import { GameElementHelper, GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { HealingInstance } from "./healinginstance";
import { GodsightBossData } from "./bossdata";

export class BattleActionHelper {
  static getActorName(bossData: GodsightBossData[], formation: GodsightPartyFormationData, actor: Actor, position: number): string {
    let actorName = "";
    if (actor == Actor.BOSS) {
      actorName = bossData[position]["name"];
    } else if (actor == Actor.PLAYER) {
      actorName = PartyFormationHelper.getNameOfFrontlineCharacterInPosition(
        formation,
        position
      );
    } else {
      actorName = "Unknown Actor Type";
    }

    return actorName;
  }

  static getCharacterIndexAtPosition(formation: GodsightPartyFormationData, position: number): number {
    const entireFormation = formation["frontline"].concat(formation["backline"]);

    return entireFormation[position];
  }

  // matching elements in styles.css
  private static elementToColorMap: Record<GameElementValue, string> = {
    "": "white", // plain
    0: "white", // plain
    1: "#D56254", // fire
    2: "#4EB6FB", // water
    3: "#A27241", // earth
    4: "#56A435", // wind
    5: "#F5BD32", // light
    6: "#B486DC", // dark
    98: "#8BFBFE", // destruction
  };

  static getDamageInstanceJsx(
    bossData: GodsightBossData[],
    formation: GodsightPartyFormationData,
    receiver: Actor,
    damageInstances: DamageInstance[],
  ): JSX.Element {
    const damageInstancesByPosition = this.getDamageInstancesGroupedByPosition(damageInstances);
    return (
      <>
        {Object.keys(damageInstancesByPosition).map(position => (
          <div key={position} className="action-description">{this.getActorName(bossData, formation, receiver, (Number(position)))} took {damageInstancesByPosition[position].map((instance, idx) => (
            <span key={idx} className={`element ${GameElementHelper.getPrettyElementName(instance["element"])}`}>{instance["value"].toLocaleString()}</span>
          )).reduce((prev: React.ReactNode[] | null, cur) => prev === null ? [cur] : [...prev, " + ", cur], null)
          } damage! {damageInstancesByPosition[position].length > 1 ?
            <>
              {damageInstancesByPosition[position]
                .every(i => i["element"] == damageInstancesByPosition[position][0]["element"]) ?
                <>
                  (Total: <span className={`element ${GameElementHelper.getPrettyElementName(damageInstancesByPosition[position][0]["element"])}`}>{damageInstancesByPosition[position].reduce((prev, cur) => prev + cur["value"], 0).toLocaleString()}</span>)&nbsp;
                </>
                :
                <>
                  (Total: {damageInstancesByPosition[position].reduce((prev, cur) => prev + cur["value"], 0).toLocaleString()})&nbsp;
                </>
              }

              (Hits: {damageInstancesByPosition[position].filter(i => i["value"] > 0).length})
            </> :
            <>
            </>
            }
          </div>
        ))}
      </>
    );
  }

  static getDamageInstancesGroupedByPosition(
    allInstances: DamageInstance[],
  ): Record<string | number, DamageInstance[]> {
    const damageInstancesByPosition: Record<string | number, DamageInstance[]> = {};
    allInstances.forEach(instance => {
      if (!damageInstancesByPosition[instance["receiverPosition"]]) {
        damageInstancesByPosition[instance["receiverPosition"]] = [];
      }
      damageInstancesByPosition[instance["receiverPosition"]].push(instance);
    });

    return damageInstancesByPosition;
  }

  static getHealingInstanceJsx(
    bossData: GodsightBossData[],
    formation: GodsightPartyFormationData,
    receiver: Actor,
    healingInstances: HealingInstance[],
  ): JSX.Element {
    const healingInstancesByPosition = this.getHealingInstancesGroupedByPosition(healingInstances);
    return (
      <>
        {Object.keys(healingInstancesByPosition).map(position => (
          <div key={position} className="action-description">{this.getActorName(bossData, formation, receiver, (Number(position)))} healed for {healingInstancesByPosition[position].map((instance, idx) => (
            <span key={idx} className={`element Heal`}>{instance["value"].toLocaleString()}</span>
          )).reduce((prev: React.ReactNode[] | null, cur) => prev === null ? [cur] : [...prev, " + ", cur], null)
          }! {healingInstancesByPosition[position].length > 1 ?
            <>
              (Total: {healingInstancesByPosition[position].reduce((prev, cur) => prev + cur["value"], 0).toLocaleString()})
            </> :
            <></>
            }
          </div>
        ))}
      </>
    );
  }

  static getHealingInstancesGroupedByPosition(
    allInstances: HealingInstance[],
  ): Record<string | number, HealingInstance[]> {
    const healingInstancesByPosition: Record<string | number, HealingInstance[]> = {};
    allInstances.forEach(instance => {
      if (!healingInstancesByPosition[instance["receiverPosition"]]) {
        healingInstancesByPosition[instance["receiverPosition"]] = [];
      }
      healingInstancesByPosition[instance["receiverPosition"]].push(instance);
    });

    return healingInstancesByPosition;
  }

  static getMainCharacterName(formation: GodsightPartyFormationData): string {
    return formation["members"][0]["name"];
  }

  private static statusBaseUrl = "https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/ui/icon/status/x64/status_";

  private static instantStandbyIcon = "1037";

  static getStatusUrl(statusIcon: string): string {
    if (statusIcon == this.instantStandbyIcon) {
      // Instant standby icon is blank,
      // replace with the charge bar icon.
      statusIcon = "1486";
    }
    return `${this.statusBaseUrl}${statusIcon}.png`;
  }
}