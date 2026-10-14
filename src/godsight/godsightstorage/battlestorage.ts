import { GodsightBattleData } from '../battletypes/battledata';

export interface GodsightStorage {
  'battles': GodsightBattleData[];
}

export const DefaultGodsightStorage = {
  'battles': [],
} as const;
