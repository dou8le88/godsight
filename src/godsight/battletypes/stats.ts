import { GameElementHelper } from "../../gbf/battletypes/scenariodata/mechanics/element";

export interface Stats {
  "hitCount": number,
  "debuffsInflictedCount": number,
  "healingReceived": number,
  "normalAttackDamage": DamageByElement,
  "skillDamage": DamageByElement,
  "chargedAttackDamage": DamageByElement,
  "otherDamage": DamageByElement,
  "dotDamage": number,
  "damageTaken": DamageByElement,
}

export type DamageByElement = Record<string | number, number>;

export interface StatsUpdate {
  "characterStats": Record<string | number, Stats>,
  "generalStats": Stats,
}

export class StatsUpdateHelper {
  private static getEmptyElementValues(): DamageByElement {
    const damageByElement: DamageByElement = {};

    GameElementHelper.getAllElements().forEach(element => {
      damageByElement[element] = 0;
    });

    return damageByElement;
  }

  static getEmptyStats(): Stats {
    return {
      "hitCount": 0,
      "debuffsInflictedCount": 0,
      "healingReceived": 0,
      "normalAttackDamage": this.getEmptyElementValues(),
      "skillDamage": this.getEmptyElementValues(),
      "chargedAttackDamage": this.getEmptyElementValues(),
      "otherDamage": this.getEmptyElementValues(),
      "dotDamage": 0,
      "damageTaken": this.getEmptyElementValues(),
    };
  }

  static getEmptyStatsUpdate(partySize?: number): StatsUpdate {
    const characterStats: Record<string | number, Stats> = {};


    if (partySize) {
      const characterIndexes = Array.from({ length: partySize }, (_, index) => index)
      characterIndexes.forEach(index => {
        characterStats[index] = this.getEmptyStats();
      });
    }

    return {
      "characterStats": characterStats,
      "generalStats": this.getEmptyStats(),
    }
  }

  /**
   * @returns a new `StatsUpdate` containing the combined stats of `first` and `second`
   */
  static concatUpdates(first: StatsUpdate, second: StatsUpdate): StatsUpdate {
    const output: StatsUpdate = this.getEmptyStatsUpdate();

    const firstCharacters = Object.keys(first["characterStats"]);
    const secondCharacters = Object.keys(second["characterStats"]);

    const allCharacters = new Set(firstCharacters.concat(secondCharacters));

    allCharacters.forEach(characterIndex => {
      output["characterStats"][characterIndex] = this.getEmptyStats();
    });

    firstCharacters.map(characterIndex => {
      const characterStats = output["characterStats"][characterIndex];
      const outputCharacterStats = output["characterStats"][characterIndex];

      this.mergeStats(characterStats, outputCharacterStats);
    });

    secondCharacters.map(characterIndex => {
      const characterStats = output["characterStats"][characterIndex];
      const outputCharacterStats = output["characterStats"][characterIndex];

      this.mergeStats(characterStats, outputCharacterStats);
    });

    this.mergeStats(first["generalStats"], output["generalStats"]);
    this.mergeStats(second["generalStats"], output["generalStats"]);

    return output;
  }

  static mergeStats(other: Stats, into: Stats): void {
    (Object.keys(into) as (keyof Stats)[]).forEach(key => {
      if (typeof into[key] === "number" && typeof other[key] === "number") {
        (into as unknown as Record<string, number>)[key] += other[key];
      } else if (typeof into[key] === "object" && typeof other[key] === "object") {
        GameElementHelper.getAllElements().forEach(element => {
          (into as unknown as Record<string, DamageByElement>)[key][element] +=
            (other as unknown as Record<string, DamageByElement>)[key][element];
        });
      } else {
        console.error(`Mismatched types for Stats field ${key}: got other: ${other[key]} and into: ${into[key]}`);
      }
    });
  }

  static divideStatsBy(stats: Stats, by: number): void {
    (Object.keys(stats) as (keyof Stats)[]).forEach(key => {
      if (typeof stats[key] === "number") {
        (stats as unknown as Record<string, number>)[key] /= by;
      } else if (typeof stats[key] === "object") {
        GameElementHelper.getAllElements().forEach(element => {
          (stats as unknown as Record<string, DamageByElement>)[key][element] /= by;
        });
      }
    });
  }
}