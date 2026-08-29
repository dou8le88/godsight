import { StatsUpdate } from "./stats";

export interface BattleAction {
  getStats(): StatsUpdate;
}