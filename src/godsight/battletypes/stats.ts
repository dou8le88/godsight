export type Stats = {
  "hitCount": number,
  "debuffsInflictedCount": number,
  "normalAttackDamage": number,
  "skillDamage": number,
  "chargedAttackDamage": number,
  "otherDamage": number,
  "healingReceived": number,
  "damageTaken": number,
}

export type StatsUpdate = {
  // TODO: basically everything is using position for character stats,
  // but that will become wrong as soon as the party formation changes.
  // Need to make this use either "player"-array indices or
  // character IDs or something, then provide a way to map current positions to those
  // for the various actions that collect these stats.
  // Actions will probably need an independent copy of the lineup at the time of the action.
  "characterStats": { [key: string | number]: Stats },
  "generalStats": Stats,
}

export class StatsUpdateHelper {
  static getEmptyStats(): Stats {
    return {
      "hitCount": 0,
      "debuffsInflictedCount": 0,
      "normalAttackDamage": 0,
      "skillDamage": 0,
      "chargedAttackDamage": 0,
      "otherDamage": 0,
      "healingReceived": 0,
      "damageTaken": 0,
    };
  }

  static getEmptyStatsUpdate(): StatsUpdate {
    return {
      "characterStats": {},
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

  private static mergeStats(other: Stats, into: Stats) {
    into["hitCount"] += other["hitCount"];
    into["debuffsInflictedCount"] += other["debuffsInflictedCount"];
    into["normalAttackDamage"] += other["normalAttackDamage"];
    into["skillDamage"] += other["skillDamage"];
    into["chargedAttackDamage"] += other["chargedAttackDamage"];
    into["chargedAttackDamage"] += other["chargedAttackDamage"];
    into["otherDamage"] += other["otherDamage"];
    into["healingReceived"] += other["healingReceived"];
    into["damageTaken"] += other["damageTaken"];
  }
}