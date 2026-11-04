export class JPLanguageTest {
  static containsJapaneseRegex =
    /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;
}
