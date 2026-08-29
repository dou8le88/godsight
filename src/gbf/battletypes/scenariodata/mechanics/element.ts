export enum PrettyElementName {
  NULL_PLAIN = "None",
  FIRE = "Fire",
  WATER = "Water",
  EARTH = "Earth",
  WIND = "Wind",
  LIGHT = "Light",
  DARK = "Dark",
  DESTRUCTION = "Destruction",
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

export type NumericGameElement = typeof GameElement[keyof typeof GameElement];

export type StringGameElement = `${NumericGameElement}` | ""

const elementValues = Object.values(GameElement);
const elementNames = Object.values(PrettyElementName);

const numericElementToName: { [key: number]: string } = elementValues.reduce((obj, key, index) => {
  obj[key] = elementNames[index];
  return obj;
}, {} as { [key: number]: string });

export class GameElementHelper {
  static getNumericGameElement(elt: GameElementValue): typeof GameElement[keyof typeof GameElement] {
    if (elt === "" || elt === undefined || elt === null) {
      return GameElement.NULL_PLAIN;
    } else {
      return Number(elt) as typeof GameElement[keyof typeof GameElement];
    }
  }

  static getPrettyElementName(elt: GameElementValue): string {
    const numericElt = GameElementHelper.getNumericGameElement(elt);

    return numericElementToName[numericElt];
  }
}