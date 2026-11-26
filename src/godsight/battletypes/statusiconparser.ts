interface IconParser {
  regex: RegExp;
  parser: (icon: string) => string;
}

export class StatusIconParser {
  private static lastIndexParser = (icon: string) => icon.at(-1) || '?';
  /**
   * AKA "it doesn't actually have stacks/duration encoded".
   */
  private static emptyParser = (_icon: string) => '';

  /**
   * A lot of turn-based boss (de)buffs have icon strings formatted like `123_14`,
   * where that last `4` is the duration. Most status effects with an underscore
   * do not have multiple digits after the underscore unless they're following this pattern.
   *
   * These checks are still imperfect, as the devs have like 10 different naming schemes
   * depending on the status effect.
   */
  static maybeAwkwardTurnDurationStatusIconRegex = /\d(\d+)$/;

  private static allParsers: IconParser[] = [
    // Crests
    {
      regex: /^6527(\d{1,2})$/,
      parser: (icon) => icon.match(/^6527(\d{1,2})$/)?.[1] || '?',
    }, // Fire
    {
      regex: /^6528(\d{1,2})$/,
      parser: (icon) => icon.match(/^6528(\d{1,2})$/)?.[1] || '?',
    }, // Water
    {
      regex: /^6529(\d{1,2})$/,
      parser: (icon) => icon.match(/^6529(\d{1,2})$/)?.[1] || '?',
    }, // Earth
    {
      regex: /^6530(\d{1,2})$/,
      parser: (icon) => icon.match(/^6530(\d{1,2})$/)?.[1] || '?',
    }, // Wind
    {
      regex: /^6531(\d{1,2})$/,
      parser: (icon) => icon.match(/^6531(\d{1,2})$/)?.[1] || '?',
    }, // Light
    {
      regex: /^6532(\d{1,2})$/,
      parser: (icon) => icon.match(/^6532(\d{1,2})$/)?.[1] || '?',
    }, // Dark
    // End Crests

    // Elemental Crit
    { regex: /^1279_1$/, parser: StatusIconParser.emptyParser }, // Fire
    { regex: /^1279_2$/, parser: StatusIconParser.emptyParser }, // Water
    { regex: /^1279_3$/, parser: StatusIconParser.emptyParser }, // Earth
    { regex: /^1279_4$/, parser: StatusIconParser.emptyParser }, // Wind
    { regex: /^1279_5$/, parser: StatusIconParser.emptyParser }, // Light
    { regex: /^1279_6$/, parser: StatusIconParser.emptyParser }, // Dark

    // Last-index-based stacks/duration
    { regex: /^1383_2[1-6](\d)$/, parser: StatusIconParser.lastIndexParser }, // Local Bonus Damage
    { regex: /^1502([1-4])$/, parser: StatusIconParser.lastIndexParser }, // Hype
    { regex: /^7458[1-9]$/, parser: StatusIconParser.lastIndexParser }, // Cheirokmeta
    { regex: /^3000_100\d$/, parser: StatusIconParser.lastIndexParser }, // DMG Fixed

    // Theion
    {
      regex: /^6879_4_\d+$/,
      parser: (icon) => icon.split('_').at(-1) || '?',
    },
    // Wings of Promise
    {
      regex: /^7743_\d+$/,
      parser: (icon) => icon.split('_').at(-1) || '?',
    },
    // Damage Cut
    {
      regex: /^1019_[0-6]_\d+$/,
      parser: StatusIconParser.emptyParser, // one of the rare statuses where the name will have the value
    },

    // This parser must always be last, as it solely needs an underscore and would override
    // any other parser that also has an underscore in the icon string.
    {
      regex: /_/,
      parser: (icon) => {
        const lastPart = icon.split('_').at(-1) || '';
        if (this.maybeAwkwardTurnDurationStatusIconRegex.test(lastPart)) {
          if (lastPart.length == 2 && lastPart.at(-1) == '0') {
            return lastPart;
          } else {
            return lastPart.slice(1);
          }
        } else {
          return lastPart;
        }
      },
    },
  ];

  static getStatusStacksOrDurationFromIcon(icon: string): string {
    const parser = this.allParsers.find((p) => p.regex.test(icon));
    return parser ? parser.parser(icon) : '';
  }
}
