import { Stats } from "./stats"

export type BattleStats = {
  "generalStats": Stats,
  "characterStats": { [key: string | number]: Stats },
}