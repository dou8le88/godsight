import { Stats } from './stats';

export interface BattleStats {
  'generalStats': Stats;
  'characterStats': Record<string | number, Stats>;
}
