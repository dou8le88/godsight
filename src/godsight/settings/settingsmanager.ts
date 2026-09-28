import { DefaultSettings, GodsightSettings } from "./godsightsettings";

export class SettingsManager {
  private static settingsKey = "godsightSettings";
  private static instance: SettingsManager;

  private settingsCache: GodsightSettings = DefaultSettings;

  private lastSetPromise = new Promise<void>((resolve) => resolve(undefined));

  private changeListeners: { id: number, callback: () => void }[] = [];
  private listenerId = 0;

  constructor() {
    // No params needed.
  }

  static getInstance(): SettingsManager {
    if (!this.instance) {
      this.instance = new SettingsManager();
      this.instance.initialize();
    }
    return this.instance;
  }

  private async initialize() {
    const existingData =
      await chrome.storage.local.get(SettingsManager.settingsKey) as { [SettingsManager.settingsKey]?: string };

    if (existingData[SettingsManager.settingsKey]) {
      const settings = JSON.parse(existingData[SettingsManager.settingsKey]!) as GodsightSettings;

      this.settingsCache = settings;
    } else {
      await chrome.storage.local.set({ [SettingsManager.settingsKey]: JSON.stringify(this.settingsCache) }).catch(reason => {
        console.error("Unable to initialize godsight settings", reason);
      });
    }

    this.fireChangeListeners();
  }

  private fireChangeListeners() {
    this.changeListeners.forEach(l => l.callback());
  }

  /**
 * Subscribes to changes to the settings cache.
 * @param callback The callback to execute when there are changes
 * @returns An ID that can be used to unlisten to changes.
 */
  public onChange(callback: () => void): number {
    const listener = { id: this.listenerId++, callback };
    this.changeListeners.push(listener);
    return listener.id;
  }

  /**
 * Unsubscribes from listening to changes to the settings cache.
 * @param id the ID returned by a call to `onChange`
 */
  public unsubscribe(id: number) {
    this.changeListeners = this.changeListeners.filter(l => l.id != id);
  }

  public getSettings(): GodsightSettings {
    return this.settingsCache;
  }

  /**
 * Updates the underlying chrome extension storage with the current cached settings.
 * Guarantees that updates are sequential,
 * such that a later update cannot override an earlier one.
 * Also notifies listeners that the settings cache was updated.
 */
  private updateUnderlyingSettingsAndNotify() {
    this.lastSetPromise = this.lastSetPromise.then(() => {
      return chrome.storage.local.set({ [SettingsManager.settingsKey]: JSON.stringify(this.settingsCache) });
    }).catch((reason) => {
      console.error(`Failed to update godsight settings with reason ${reason}`);
    });
    this.fireChangeListeners();
  }

  public updateSingleSetting<T extends keyof GodsightSettings>(setting: T, newValue: GodsightSettings[T]) {
    this.settingsCache = structuredClone(this.settingsCache);
    this.settingsCache[setting] = newValue;
    this.updateUnderlyingSettingsAndNotify();
  }
}