import { BattleAction } from "../battletypes/battleaction";
import { BattleActionParser } from "../battletypes/battleactionparser";
import { GodsightBattleData } from "../battletypes/battledata";
import { defaultSettings, GodsightSettings } from "../godsightsettings";
import { GodsightStorage } from "./battlestorage";

export class GodsightStorageManager {
  private static godsightStorageKey = "godsightStorage";
  private static instance: GodsightStorageManager;

  private storageCache: GodsightStorage = {
    "settings": defaultSettings,
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

  private async initialize() {
    const existingData = await chrome.storage.local.get(GodsightStorageManager.godsightStorageKey) as { [GodsightStorageManager.godsightStorageKey]?: string };

    if (existingData[GodsightStorageManager.godsightStorageKey]) {
      const storage = JSON.parse(existingData[GodsightStorageManager.godsightStorageKey]!) as GodsightStorage;

      Object.keys(storage["battles"]).forEach(battle => {
        const battleJson = storage["battles"][battle];

        const turns = Object.keys(battleJson["turnData"]);

        turns.forEach(turn => {
          battleJson["turnData"][turn]["turnActions"] = battleJson["turnData"][turn]["turnActions"].map(action => {
            return BattleActionParser.fromJSON(action as unknown as Record<string, unknown>);
          }).filter(i => i) as BattleAction[];
        });
      });

      this.storageCache = storage;
    } else {
      await chrome.storage.local.set({ [GodsightStorageManager.godsightStorageKey]: JSON.stringify(this.storageCache) }).catch(reason => {
        console.error("Unable to initialize godsight storage", reason);
      });
    }

    this.fireChangeListeners();

    // TODO: handle external updates via multiple windows opened at once?
    // Seems like more trouble than it's worth.
    // chrome.storage.local.onChanged.addListener((changes) => {
    //   if (changes[key]) {
    //     const storageChanges = changes[key];
    //   } else {
    //     console.warn(`Unhandled storage changes in ${Object.keys(changes)}`);
    //   }
    // });
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
    this.storageCache = structuredClone(this.storageCache);
    this.storageCache["battles"][battleId] = battleData;
    this.updateUnderlyingStorageAndNotify();
  }

  public deleteBattle(battleId: string | number) {
    this.storageCache = structuredClone(this.storageCache);
    delete this.storageCache["battles"][battleId];
    this.updateUnderlyingStorageAndNotify();
  }

  public setSettings(settings: GodsightSettings) {
    this.storageCache = structuredClone(this.storageCache);
    this.storageCache["settings"] = settings;
    this.updateUnderlyingStorageAndNotify();
  }
}