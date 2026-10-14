export enum PrettyElementName {
  NULL_PLAIN = 'Plain',
  FIRE = 'Fire',
  WATER = 'Water',
  EARTH = 'Earth',
  WIND = 'Wind',
  LIGHT = 'Light',
  DARK = 'Dark',
  DESTRUCTION = 'Destruction',
}

/**
 * WTF Cygames why can they be either strings or numbers???
 */
export type GameElementValue = NumericGameElement | StringGameElement;

export const GameElement = {
  NULL_PLAIN: 0,
  FIRE: 1,
  WATER: 2,
  EARTH: 3,
  WIND: 4,
  LIGHT: 5,
  DARK: 6,
  DESTRUCTION: 98,
} as const;

export type NumericGameElement = (typeof GameElement)[keyof typeof GameElement];

export type StringGameElement = `${NumericGameElement}` | '';

const elementValues = Object.values(GameElement);
const elementNames = Object.values(PrettyElementName);

const numericElementToName: Record<number, string> = elementValues.reduce(
  (obj, key, index) => {
    obj[key] = elementNames[index];
    return obj;
  },
  {} as Record<number, string>,
);

const elementColorMapping: Record<NumericGameElement, string> = {
  [GameElement.NULL_PLAIN]: '#FFFFFF',
  [GameElement.FIRE]: '#D56254',
  [GameElement.WATER]: '#4EB6FB',
  [GameElement.EARTH]: '#A27241',
  [GameElement.WIND]: '#56A435',
  [GameElement.LIGHT]: '#F5BD32',
  [GameElement.DARK]: '#B486DC',
  [GameElement.DESTRUCTION]: '#8BFBFE',
};

export class GameElementHelper {
  static getAllElements(): NumericGameElement[] {
    return Object.values(GameElement);
  }

  static getNumericGameElement(elt: GameElementValue): NumericGameElement {
    if (elt === '' || elt === undefined || elt === null) {
      return GameElement.NULL_PLAIN;
    } else {
      return Number(elt) as NumericGameElement;
    }
  }

  static getPrettyElementName(elt: GameElementValue): string {
    const numericElt = GameElementHelper.getNumericGameElement(elt);

    return numericElementToName[numericElt];
  }

  static getElementColor(elt: NumericGameElement): string {
    return elementColorMapping[elt];
  }
}
