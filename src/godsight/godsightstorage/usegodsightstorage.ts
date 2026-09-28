import { useSyncExternalStore } from 'react';
import { GodsightStorageManager } from './godsightstoragemanager';
import { GodsightStorage } from './battlestorage';

const godsightStorageManager = GodsightStorageManager.getInstance();

export function useGodsightStorage(): GodsightStorage {
  const godsightStorage = useSyncExternalStore(subscribe, getSnapshot);
  return godsightStorage;
}

function getSnapshot(): GodsightStorage {
  return godsightStorageManager.getStorage();
}

function subscribe(callback: () => void) {
  const listenerId = godsightStorageManager.onChange(callback);

  return () => {
    godsightStorageManager.unsubscribe(listenerId);
  };
}