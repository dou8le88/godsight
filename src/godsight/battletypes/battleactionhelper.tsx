import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { DamageInstance } from "./damageinstance";
import { GodsightPartyFormationData, PartyFormationHelper } from "./partyformationdata";
import { GameElementHelper, GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { HealingInstance } from "./healinginstance";
import { GodsightBossData } from "./bossdata";
import { BattleAction } from "./battleaction";
import { identity } from "../../util/functional";
import { BattleActionParser } from "./battleactionparser";

export class BattleActionHelper {
  static IconlessStatusEffects = [
    "1047",
  ];

  static getRehydratedActions(battleActions: BattleAction[]): BattleAction[] {
    const rehydratedActions: (BattleAction | undefined)[] = [];

    battleActions.forEach(action => {
      rehydratedActions.push(BattleActionParser.fromJSON(action as unknown as Record<string, unknown>));
    });

    return rehydratedActions.filter(identity) as BattleAction[];
  }


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

  static getActorIndex(formation: GodsightPartyFormationData, actor: Actor, position: number): number {
    return actor == Actor.PLAYER ? this.getCharacterIndexAtPosition(formation, position) : position;
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
    damageInstances: DamageInstance[],
    maybeHitCountOverride?: number,
  ): JSX.Element {
    const damageInstancesByRecipient = this.getDamageInstancesGroupedByRecipient(damageInstances);
    const onlyRealDamageInstancesByRecipient: Record<string, DamageInstance[]> = {};
    Object.keys(damageInstancesByRecipient).forEach(key => {
      const instances = damageInstancesByRecipient[key];
      const nonZeroInstances = instances.filter(i => i["value"] > 0);
      if (nonZeroInstances.length == 0) {
        nonZeroInstances.push(instances[0]);
      }
      onlyRealDamageInstancesByRecipient[key] = nonZeroInstances;
    });
    return (
      <>
        {Object.keys(onlyRealDamageInstancesByRecipient).map(recipient => (
          <div key={recipient} className="action-description">{recipient} took {onlyRealDamageInstancesByRecipient[recipient].map((instance, idx) => (
            <span key={idx} className={`element ${GameElementHelper.getPrettyElementName(instance["element"])}`}>{instance["value"].toLocaleString()}</span>
          )).reduce((prev: React.ReactNode[] | null, cur) => prev === null ? [cur] : [...prev, " + ", cur], null)
          } damage! {onlyRealDamageInstancesByRecipient[recipient].length > 1 || (maybeHitCountOverride !== undefined && maybeHitCountOverride > 1) ?
            <>
              {onlyRealDamageInstancesByRecipient[recipient].filter(instance => instance["value"] > 0)
                .every(i => i["element"] == onlyRealDamageInstancesByRecipient[recipient][0]["element"]) ?
                <>
                  (Total: <span className={`element ${GameElementHelper.getPrettyElementName(onlyRealDamageInstancesByRecipient[recipient][0]["element"])}`}>{onlyRealDamageInstancesByRecipient[recipient].reduce((prev, cur) => prev + cur["value"], 0).toLocaleString()}</span>)&nbsp;
                </>
                :
                <>
                  (Total: {onlyRealDamageInstancesByRecipient[recipient].reduce((prev, cur) => prev + cur["value"], 0).toLocaleString()})&nbsp;
                </>
              }

              (Hits: {maybeHitCountOverride ? maybeHitCountOverride : onlyRealDamageInstancesByRecipient[recipient].filter(i => i["value"] > 0).length})
            </> :
            <>
            </>
            }
          </div>
        ))}
      </>
    );
  }

  static getDamageInstancesGroupedByRecipient(
    allInstances: DamageInstance[],
  ): Record<string, DamageInstance[]> {
    const damageInstancesByPosition: Record<string, DamageInstance[]> = {};
    allInstances.forEach(instance => {
      if (!damageInstancesByPosition[instance["receiverName"]]) {
        damageInstancesByPosition[instance["receiverName"]] = [];
      }
      damageInstancesByPosition[instance["receiverName"]].push(instance);
    });

    return damageInstancesByPosition;
  }

  static getHealingInstanceJsx(
    healingInstances: HealingInstance[],
  ): JSX.Element {
    const healingInstancesByRecipient = this.getHealingInstancesGroupedByRecipient(healingInstances);
    return (
      <>
        {Object.keys(healingInstancesByRecipient).map(recipient => (
          <div key={recipient} className="action-description">{recipient} healed for {healingInstancesByRecipient[recipient].map((instance, idx) => (
            <span key={idx} className={`element Heal`}>{instance["value"].toLocaleString()}</span>
          )).reduce((prev: React.ReactNode[] | null, cur) => prev === null ? [cur] : [...prev, " + ", cur], null)
          }! {healingInstancesByRecipient[recipient].length > 1 ?
            <>
              (Total: {healingInstancesByRecipient[recipient].reduce((prev, cur) => prev + cur["value"], 0).toLocaleString()})
            </> :
            <></>
            }
          </div>
        ))}
      </>
    );
  }

  static getHealingInstancesGroupedByRecipient(
    allInstances: HealingInstance[],
  ): Record<string, HealingInstance[]> {
    const healingInstancesByRecipient: Record<string, HealingInstance[]> = {};
    allInstances.forEach(instance => {
      if (!healingInstancesByRecipient[instance["receiverName"]]) {
        healingInstancesByRecipient[instance["receiverName"]] = [];
      }
      healingInstancesByRecipient[instance["receiverName"]].push(instance);
    });

    return healingInstancesByRecipient;
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