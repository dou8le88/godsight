import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { DamageInstance } from "./damageinstance";
import { GodsightPartyFormationData, PartyFormationHelper } from "./partyformationdata";
import { GameElement, GameElementHelper, GameElementValue, NumericGameElement } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { HealingInstance } from "./healinginstance";
import { GodsightBossData } from "./bossdata";
import { BattleAction } from "./battleaction";
import { identity } from "../../util/functional";
import { BattleActionParser } from "./battleactionparser";
import { DamageDisplay } from "../settings/godsightsettings";
import { DamageByElement, StatsUpdateHelper } from "./stats";

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
  private static elementToColorMap: Record<NumericGameElement, string> = {
    [GameElement.NULL_PLAIN]: "white",
    [GameElement.FIRE]: "#D56254",
    [GameElement.WATER]: "#4EB6FB",
    [GameElement.EARTH]: "#A27241",
    [GameElement.WIND]: "#56A435",
    [GameElement.LIGHT]: "#F5BD32",
    [GameElement.DARK]: "#B486DC",
    [GameElement.DESTRUCTION]: "#8BFBFE",
  };

  static getDamageInstanceJsx(
    damageInstances: DamageInstance[],
    damageDisplay: DamageDisplay,
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
    const damageByElementByRecipient: Record<string, DamageByElement> = {};
    const totalDamageByRecipient: Record<string, number> = {};
    Object.keys(onlyRealDamageInstancesByRecipient).forEach(recipient => {
      damageByElementByRecipient[recipient] = StatsUpdateHelper.getEmptyElementValues();
      totalDamageByRecipient[recipient] = 0;
      onlyRealDamageInstancesByRecipient[recipient].forEach(instance => {
        damageByElementByRecipient[recipient][instance["element"]] += instance["value"];
        totalDamageByRecipient[recipient] += instance["value"];
      });
    });
    const colorGradientByRecipient: Record<string, string> = {};
    Object.keys(damageByElementByRecipient).forEach(recipient => {
      const elementDamage: { damage: number, element: NumericGameElement }[] = [];
      Object.keys(damageByElementByRecipient[recipient]).forEach(element => {
        if (damageByElementByRecipient[recipient][element] > 0) {
          elementDamage.push({
            damage: damageByElementByRecipient[recipient][element],
            element: GameElementHelper.getNumericGameElement(element as GameElementValue),
          });
        }
      });
      elementDamage.sort((a, b) => b.damage - a.damage);
      let boundary = 0;
      colorGradientByRecipient[recipient] = elementDamage.map(eltDmg => {
        const color = this.elementToColorMap[eltDmg.element];
        const percent = ((eltDmg.damage / totalDamageByRecipient[recipient]) * 100);
        const midpoint = boundary + (percent / 2);

        boundary += percent;

        return `${color} ${midpoint.toFixed(0)}%`;
      }).join(", ");
    });

    switch (damageDisplay) {
      case DamageDisplay.SINGLE_NUMBER: {
        return (
          <>
            {Object.keys(onlyRealDamageInstancesByRecipient).map(recipient => (
              <div key={recipient} className="action-description">{recipient} took&nbsp;
                <span className="element gradient" style={{
                  "background": `linear-gradient(to right, ${colorGradientByRecipient[recipient]}) text`,
                }}>
                  {onlyRealDamageInstancesByRecipient[recipient].reduce((prev, cur) => prev + cur["value"], 0).toLocaleString()}
                </span> damage! {
                  onlyRealDamageInstancesByRecipient[recipient].length > 1 || (maybeHitCountOverride !== undefined && maybeHitCountOverride > 1) ?
                    <>
                      (Hits: {maybeHitCountOverride ? maybeHitCountOverride : onlyRealDamageInstancesByRecipient[recipient].filter(i => i["value"] > 0).length})
                    </> :
                    <>
                    </>
                }
              </div >
            ))
            }
          </>
        );
      }

      case DamageDisplay.ONE_PER_ELEMENT: {
        const totalDamageByElementPerRecipient: Record<string, DamageByElement> = {};
        Object.keys(onlyRealDamageInstancesByRecipient).forEach(recipient => {
          const damageInstances = onlyRealDamageInstancesByRecipient[recipient];
          totalDamageByElementPerRecipient[recipient] = {};
          damageInstances.forEach(instance => {
            if (totalDamageByElementPerRecipient[recipient][instance["element"]] == undefined) {
              totalDamageByElementPerRecipient[recipient][instance["element"]] = instance["value"]
            } else {
              totalDamageByElementPerRecipient[recipient][instance["element"]] += instance["value"];
            }
          });
        });

        return (
          <>
            {Object.keys(totalDamageByElementPerRecipient).map(recipient => (
              <div key={recipient} className="action-description">{recipient} took {Object.keys(totalDamageByElementPerRecipient[recipient]).map((element, idx) => (
                <span key={idx}>
                  {totalDamageByElementPerRecipient[recipient][element] > 0 ?
                    <span className={`element ${GameElementHelper.getPrettyElementName(element as GameElementValue)}`}>{totalDamageByElementPerRecipient[recipient][element].toLocaleString()}</span> :
                    <></>
                  }
                </span>
              )).reduce((prev: React.ReactNode[] | null, cur) => prev === null ? [cur] : [...prev, " + ", cur], null)
              } damage! {onlyRealDamageInstancesByRecipient[recipient].length > 1 || (maybeHitCountOverride !== undefined && maybeHitCountOverride > 1) ?
                <>
                  {Object.keys(totalDamageByElementPerRecipient[recipient]).length > 1 ?
                    <>
                      {onlyRealDamageInstancesByRecipient[recipient].filter(instance => instance["value"] > 0)
                        .every(i => i["element"] == onlyRealDamageInstancesByRecipient[recipient][0]["element"]) ?
                        <>
                          (Total: <span className={`element ${GameElementHelper.getPrettyElementName(onlyRealDamageInstancesByRecipient[recipient][0]["element"])}`}>{totalDamageByRecipient[recipient].toLocaleString()}</span>)&nbsp;
                        </>
                        :
                        <>
                          (Total:&nbsp;
                          <span className="element gradient" style={{
                            "background": `linear-gradient(to right, ${colorGradientByRecipient[recipient]}) text`,
                          }}>{totalDamageByRecipient[recipient].toLocaleString()}
                          </span>
                          )
                        </>
                      }
                    </> :
                    <></>
                  }

                  &nbsp;(Hits: {maybeHitCountOverride ? maybeHitCountOverride : onlyRealDamageInstancesByRecipient[recipient].filter(i => i["value"] > 0).length})
                </> :
                <>
                </>
                }
              </div>
            ))}
          </>
        );
      }

      case DamageDisplay.ALL_HITS: {
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
                      (Total:&nbsp;
                      <span className="element gradient" style={{
                        "background": `linear-gradient(to right, ${colorGradientByRecipient[recipient]}) text`,
                      }}>{totalDamageByRecipient[recipient].toLocaleString()}
                      </span>
                      )
                    </>
                  }

                  &nbsp;(Hits: {maybeHitCountOverride ? maybeHitCountOverride : onlyRealDamageInstancesByRecipient[recipient].filter(i => i["value"] > 0).length})
                </> :
                <>
                </>
                }
              </div>
            ))}
          </>
        );
      }
    }
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