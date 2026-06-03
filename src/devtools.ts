const validHosts = [
  "https://game.granbluefantasy.jp",
  "https://steam.granbluefantasy.jp"
];

// /rest/raid/*.json for solo battles/free quests.
// /rest/multiraid/*.json for multiplayer battles.
const battleApiRegex = /^\/rest\/(multi)?raid/;

(async () => {
  chrome.devtools.panels.create('Godsight', 'icons/godsight-48x48.png', 'panel.html', panel => {
    // TODO: display active battle stats when panel is selected? Historical battle data otherwise?
    // panel.onShown
  });

  async function notifyStateOfInspectedPage(devtoolsTabId: number) {
    const devtoolsTab = await chrome.tabs.get(devtoolsTabId);
    const tabUrl = devtoolsTab.url;
    if (tabUrl) {
      if (!validHosts.some(h => tabUrl.startsWith(h))) {
        // We navigated away from a GBF page.
      } else {
        // We navigated to a GBF page.
      }
    }
  }

  // check on opening devtools if we're inspecting GBF.
  notifyStateOfInspectedPage(chrome.devtools.inspectedWindow.tabId);

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const devtoolsTabId = chrome.devtools.inspectedWindow.tabId;
    if (tabId == devtoolsTabId) {
      notifyStateOfInspectedPage(devtoolsTabId);
    }
  });

  // TODO: retrying a trial battle has no response JSON, have to check and make sure for that one specifically.
  // May need to specially add a listener on request for it.

  chrome.devtools.network.onRequestFinished.addListener(request => {
    // Ignore non-GBF requests.
    const url = request.request.url;
    if (!validHosts.some(h => url.startsWith(h))) {
      return;
    }


    // Only accept battle data requests.
    const path = validHosts.reduce((prev, cur) => prev.replace(cur, ""), url);
    if (path?.match(battleApiRegex)) {
      console.log(path);
    }
  });
})();