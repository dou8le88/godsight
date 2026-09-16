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
    into["hitCount"] += other["hitCount"];
    into["debuffsInflictedCount"] += other["debuffsInflictedCount"];
    into["healingReceived"] += other["healingReceived"];
    into["dotDamage"] += other["dotDamage"];

    GameElementHelper.getAllElements().forEach(element => {
      into["normalAttackDamage"][element] += other["normalAttackDamage"][element];
      into["skillDamage"][element] += other["skillDamage"][element];
      into["chargedAttackDamage"][element] += other["chargedAttackDamage"][element];
      into["otherDamage"][element] += other["otherDamage"][element];
      into["damageTaken"][element] += other["damageTaken"][element];
    });
  }
}