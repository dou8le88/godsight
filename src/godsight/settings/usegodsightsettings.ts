import { useSyncExternalStore } from 'react';
import { GodsightSettings } from './godsightsettings';
import { SettingsManager } from './settingsmanager';

const settingsManager = SettingsManager.getInstance();

export function useGodsightSettings(): GodsightSettings {
  const settings = useSyncExternalStore(subscribe, getSnapshot);
  return settings;
}

function getSnapshot(): GodsightSettings {
  return settingsManager.getSettings();
}

function subscribe(callback: () => void) {
  const listenerId = settingsManager.onChange(callback);

  return () => {
    settingsManager.unsubscribe(listenerId);
  };
}
