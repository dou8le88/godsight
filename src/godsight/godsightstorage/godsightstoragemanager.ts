import { BattleActionHelper } from "../battletypes/battleactionhelper";
import { GodsightBattleData } from "../battletypes/battledata";
import { GodsightStorage } from "./battlestorage";

export class GodsightStorageManager {
  private static godsightStorageKey = "godsightStorage";
  private static instance: GodsightStorageManager;

  private storageCache: GodsightStorage = {
    "battles": {},
  };

  private lastSetPromise = new Promise<void>((resolve) => resolve(undefined));

  private changeListeners: { id: number, callback: () => void }[] = [];
  private listenerId = 0;

  constructor() {
    // No params needed.
  }

  static getInstance(): GodsightStorageManager {
    if (!this.instance) {
      this.instance = new GodsightStorageManager();
      this.instance.initialize();
    }
    return this.instance;
  }

  private rehydrateTurns(data: GodsightBattleData): void {
    const turns = Object.keys(data["turnData"]);

    turns.forEach(turn => {
      data["turnData"][turn]["turnActions"] = BattleActionHelper.getRehydratedActions(
        data["turnData"][turn]["turnActions"]
      );
    });
  }

  private cloneAndRehydrateStorage() {
    this.storageCache = structuredClone(this.storageCache);
    Object.keys(this.storageCache["battles"]).forEach(key => {
      const battle = this.storageCache["battles"][key];
      this.rehydrateTurns(battle);
    });
  }

  private async initialize() {
    const existingData = await chrome.storage.local.get(GodsightStorageManager.godsightStorageKey) as { [GodsightStorageManager.godsightStorageKey]?: string };

    if (existingData[GodsightStorageManager.godsightStorageKey]) {
      const storage = JSON.parse(existingData[GodsightStorageManager.godsightStorageKey]!) as GodsightStorage;

      Object.keys(storage["battles"]).forEach(battle => {
        const battleJson = storage["battles"][battle];

        this.rehydrateTurns(battleJson);
      });

      this.storageCache = storage;
    } else {
      await chrome.storage.local.set({ [GodsightStorageManager.godsightStorageKey]: JSON.stringify(this.storageCache) }).catch(reason => {
        console.error("Unable to initialize godsight storage", reason);
      });
    }

    this.fireChangeListeners();
  }

  /**
   * Updates the underlying chrome extension storage with the current cached storage.
   * Guarantees that updates are sequential,
   * such that a later update cannot override an earlier one.
   * Also notifies listeners that the storage cache was updated.
   */
  private updateUnderlyingStorageAndNotify() {
    this.lastSetPromise = this.lastSetPromise.then(() => {
      return chrome.storage.local.set({ [GodsightStorageManager.godsightStorageKey]: JSON.stringify(this.storageCache) });
    }).catch((reason) => {
      console.error(`Failed to update godsight storage with reason ${reason}`);
    });
    this.fireChangeListeners();
  }

  private fireChangeListeners() {
    this.changeListeners.forEach(l => l.callback());
  }

  /**
   * Subscribes to changes to the storage cache.
   * @param callback The callback to execute when there are changes
   * @returns An ID that can be used to unlisten to changes.
   */
  public onChange(callback: () => void): number {
    const listener = { id: this.listenerId++, callback };
    this.changeListeners.push(listener);
    return listener.id;
  }

  /**
   * Unsubscribes from listening to changes to the storage cache.
   * @param id the ID returned by a call to `onChange`
   */
  public unsubscribe(id: number) {
    this.changeListeners = this.changeListeners.filter(l => l.id != id);
  }

  public getStorage(): GodsightStorage {
    return this.storageCache;
  }

  public getBattleData(battleId: number): GodsightBattleData | undefined {
    return this.storageCache["battles"][battleId];
  }

  public setBattleData(battleId: number, battleData: GodsightBattleData) {
    this.cloneAndRehydrateStorage();
    this.storageCache["battles"][battleId] = battleData;
    this.updateUnderlyingStorageAndNotify();
  }

  public deleteBattle(battleId: string | number) {
    this.cloneAndRehydrateStorage();
    delete this.storageCache["battles"][battleId];
    this.updateUnderlyingStorageAndNotify();
  }
}