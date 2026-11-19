import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { chrome } from 'vitest-chrome';

type Listener = (...args: unknown[]) => void;

function createEventMock() {
  const listeners = new Set<Listener>();
  return {
    addListener: (callback: Listener) => {
      listeners.add(callback);
    },
    removeListener: (callback: Listener) => {
      listeners.delete(callback);
    },
    hasListener: (callback: Listener) => listeners.has(callback),
    hasListeners: () => listeners.size > 0,
    clearListeners: () => listeners.clear(),
    getListeners: () => new Set(listeners),
    callListeners: (...args: unknown[]) => {
      listeners.forEach((callback) => callback(...args));
    },
  };
}

// vitest-chrome models `chrome.storage.onChanged` but not the per-area
// `chrome.storage.local.onChanged` event the extension subscribes to.
function installStorageAreaEvents() {
  const onChanged = createEventMock();
  for (const area of ['local', 'managed', 'sync'] as const) {
    (chrome.storage[area] as unknown as Record<string, unknown>)['onChanged'] =
      onChanged;
  }
}

let evalResponses: Record<string, unknown> = {};

function installInspectedWindowEval() {
  const inspectedWindow = chrome.devtools.inspectedWindow as unknown as Record<
    string,
    unknown
  >;

  inspectedWindow['setEvalResponse'] = (
    expression: string,
    returnValue: unknown,
  ) => {
    evalResponses[expression] = returnValue;
  };

  inspectedWindow['clearEvalResponses'] = () => {
    evalResponses = {};
  };

  inspectedWindow['eval'] = (
    expression: string,
    callback?: (result: unknown) => void,
  ) => {
    callback?.(evalResponses[expression]);
  };
}

let localStore: Record<string, unknown> = {};

function installStorageMock() {
  chrome.storage.local.get.mockImplementation(
    (keys?: unknown, callback?: (items: Record<string, unknown>) => void) => {
      const result: Record<string, unknown> = {};
      if (typeof keys === 'string') {
        if (keys in localStore) result[keys] = localStore[keys];
      } else if (Array.isArray(keys)) {
        keys.forEach((key) => {
          if (key in localStore) result[key] = localStore[key];
        });
      } else if (keys && typeof keys === 'object') {
        Object.assign(result, keys, localStore);
      } else {
        Object.assign(result, localStore);
      }
      callback?.(result);
      return Promise.resolve(result);
    },
  );

  chrome.storage.local.set.mockImplementation(
    (items: Record<string, unknown>, callback?: () => void) => {
      Object.assign(localStore, items);
      callback?.();
      return Promise.resolve();
    },
  );

  chrome.storage.local.clear.mockImplementation((callback?: () => void) => {
    localStore = {};
    callback?.();
    return Promise.resolve();
  });
}

// The extension reads `chrome` as a global and some of its modules call into it
// at import time, so the global has to exist before the test file is loaded.
// Only `chrome` itself is assigned: copying the whole mock onto `globalThis`
// would collide with jsdom's getter-only `window.history`/`location`.
(globalThis as unknown as Record<string, unknown>)['chrome'] = chrome;

installStorageAreaEvents();
installInspectedWindowEval();
installStorageMock();

beforeEach(() => {
  evalResponses = {};
  localStore = {};
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
