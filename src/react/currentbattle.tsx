import { useSyncExternalStore } from 'react';

const battleRegex = /raid(?:_multi)?\/(\d+)/;

let callbacks: Array<{ id: number, callback: () => void }> = [];
let listenerId: number = 0;

let currentBattle: number | undefined = undefined;

chrome.devtools.inspectedWindow.eval("window.location.href", (url: string) => {
  checkCurrentPage(url);
});

chrome.devtools.network.onNavigated.addListener(checkCurrentPage);

function checkCurrentPage(url: string) {
  const gbfPage = url.split("#")[1];
  if (gbfPage) {
    const battle = (gbfPage.match(battleRegex) || [])[1];
    if (battle) {
      currentBattle = parseInt(battle);
    } else {
      currentBattle = undefined;
    }
    callbacks.forEach(c => c.callback());
  } else {
    currentBattle = undefined;
    callbacks.forEach(c => c.callback());
  }
}

export function useCurrentBattle(): number | undefined {
  const currentBattle = useSyncExternalStore(subscribe, getSnapshot);
  return currentBattle;
}

function getSnapshot(): number | undefined {
  return currentBattle;
}

function subscribe(callback: () => void) {
  const id = callbacks.push({ id: listenerId++, callback });

  return () => {
    callbacks = callbacks.filter(c => c.id != id);
  };
}