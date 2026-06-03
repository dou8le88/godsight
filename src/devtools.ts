'use strict';

const validHosts = [
  "https://game.granbluefantasy.jp",
  "https://steam.granbluefantasy.jp"
];

chrome.devtools.panels.create('Godsight', 'icons/godsight-48x48.png', 'panel.html', panel => {
  // TODO: display active battle stats when panel is selected? Historical battle data otherwise?
  // panel.onShown
});

// TODO: retrying a trial battle has no response JSON, have to check and make sure for this one specifically.
// May need to specially add a listener on request for it.

// /rest/raid/*.json for solo battles/free quests.
// /rest/multiraid/*.json for multiplayer battles.
const battleApiRegex = /^\/rest\/(multi)?raid/;

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