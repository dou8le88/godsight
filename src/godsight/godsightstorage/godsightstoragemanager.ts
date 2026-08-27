import { GodsightBattleData } from "../battletypes/battledata";
import { defaultSettings, GodsightSettings } from "../godsightsettings";
import { GodsightStorage } from "./battlestorage";

export class GodsightStorageManager {
  private static godsightStorageKey: "godsightStorage";
  private static instance: GodsightStorageManager;

  private storageCache: GodsightStorage = {
    "settings": defaultSettings,
    "battles": {},
  };

  private lastSetPromise: Promise<any> = new Promise((resolve, _reject) => resolve(undefined));

  private changeListeners: Array<{ id: number, callback: () => void }> = [];
  private listenerId: number = 0;

  constructor() {
  }

  static getInstance(): GodsightStorageManager {
    if (!this.instance) {
      this.instance = new GodsightStorageManager();
      this.instance.initialize();
    }
    return this.instance;
  }

  private async initialize() {
    const key = GodsightStorageManager.godsightStorageKey;
    const existingData = await chrome.storage.local.get(key) as { [key]?: GodsightStorage };

    if (existingData[key]) {
      this.storageCache = existingData[key];
    } else {
      await chrome.storage.local.set({ [key]: this.storageCache });
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
   * such that a later update cannot override a former.
   * Also notifies listeners that the storage cache was updated.
   */
  private updateStorageAndNotify() {
    this.lastSetPromise = this.lastSetPromise.then(() => {
      return chrome.storage.local.set({ [GodsightStorageManager.godsightStorageKey]: this.storageCache });
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
    this.updateStorageAndNotify();
  }

  public setSettings(settings: GodsightSettings) {
    this.storageCache["settings"] = settings;
    this.updateStorageAndNotify();
  }
}