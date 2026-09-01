import { useEffect, useState } from "react";
import WrongWebsiteBanner from "./wrongwebsitebanner";
import { GranblueBattleData } from "../gbf/battletypes/battledata";
import { StartData } from "../gbf/battletypes/startdata";
import { RetreatData } from "../gbf/battletypes/retiredata";
import BattleTracker from "./battletracker/battletracker";
import { BattleScenarioParser } from "../battlescenarioparser";
import { useGodsightStorage } from "./battletracker/usegodsightstorage";
import { GodsightStorageManager } from "../godsight/godsightstorage/godsightstoragemanager";
import BattleSummary from "./battletracker/battlesummary";

export default function GodsightPanel() {
  const validHosts = [
    "game.granbluefantasy.jp",
    "steam.granbluefantasy.jp"
  ];

  // /rest/raid/*.json for solo battles/free quests.
  // /rest/multiraid/*.json for multiplayer battles.
  const battleApiRegex = /^\/rest\/(multi)?raid/;

  // Find out if we're inspecting a GBF page.
  const [onGbfPage, setOnGbfPage] = useState(false);
  useEffect(() => {
    function notifyStateOfInspectedPage(url: string) {
      const tabUrl = new URL(url);
      if (validHosts.some(h => tabUrl.host.startsWith(h))) {
        setOnGbfPage(true);
      } else if (!validHosts.some(h => tabUrl.host.startsWith(h))) {
        setOnGbfPage(false);
      }
    }
    // check on opening devtools if we're inspecting GBF.
    chrome.devtools.inspectedWindow.eval("window.location.href", (url: string) => {
      notifyStateOfInspectedPage(url);
    });

    chrome.devtools.network.onNavigated.addListener(notifyStateOfInspectedPage);

    // Clean up listeners on component unmount
    return () => {
      chrome.devtools.network.onNavigated.removeListener(notifyStateOfInspectedPage);
    };
  }, []);

  const storageManager = GodsightStorageManager.getInstance();
  const battleScenarioParser = new BattleScenarioParser();
  const godsightStorage = useGodsightStorage();

  // Only listen for network requests when we're inspecting GBF.
  useEffect(() => {
    if (!onGbfPage) return;

    function startDataHandler(data: StartData, endpoint: string) {
      console.trace(`Got start data for ${endpoint}`);

      const godsightBattleData = battleScenarioParser.parseStartData(data);

      storageManager.setOrMergeBattleData(godsightBattleData["raidId"], godsightBattleData);
    }

    function battleDataHandler(data: GranblueBattleData, endpoint: string) {
      console.log(`Got battle data for ${endpoint}`);
    }

    function retreatDataHandler(data: RetreatData) {

    }

    function retryBattleHandler() {
      // Since there's no response body to this, we just edit the currently-tracked battle.
    }

    async function onRequestFinishedListener(request: chrome.devtools.network.Request) {
      // Ignore non-GBF requests.
      const url = new URL(request.request.url);
      if (!validHosts.some(h => url.host == h)) {
        return;
      }

      // Only accept battle data requests.
      if (url.pathname.match(battleApiRegex)) {
        // Ignore failed requests.
        if (request.response.status == 200) {

          request.getContent((content, encoding) => {
            const endpoint = url.pathname.split("/").at(-1);

            switch (endpoint) {
              // Battle actions.
              case "ability_result.json":
              case "fatal_chain_result.json":
              case "normal_attack_result.json":
              case "summon_result.json":
              case "temporary_item_result.json":
              case "user_recovery.json":
                try {
                  const body = JSON.parse(content) as GranblueBattleData;
                  battleDataHandler(body, endpoint);
                } catch (e: unknown) {
                  console.error(e);
                }
                return;
              case "start.json":
                // On battle start or on refreshing a page.
                try {
                  const body = JSON.parse(content) as StartData;
                  startDataHandler(body, endpoint);
                } catch (e: unknown) {
                  console.error(e);
                }
                return;
              case "retire.json":
                // Retreating.
                try {
                  const body = JSON.parse(content) as RetreatData;
                  retreatDataHandler(body);
                } catch (e: unknown) {
                  console.error(e);
                }
                return;
              case "retry_trialbattle.json":
                // Restarting a trial battle
                retryBattleHandler();
                return;
              // Misc configuration endpoints that don't contain battle info.
              case "setting":
              case "auto_setting":
                return;
              default:
                if (endpoint && !isNaN(Number.parseInt(endpoint))) {
                  // Battle-specific settings, endpoint is like /rest/raid/setting/123456
                } else {
                  console.warn(`Unhandled battle API endpoint ${endpoint}`);
                }
                return;
            }
          });
        }
      }
    }

    chrome.devtools.network.onRequestFinished.addListener(onRequestFinishedListener);

    return () => {
      chrome.devtools.network.onRequestFinished.removeListener(onRequestFinishedListener);
    };
  }, [onGbfPage]);

  const allBattles = Object.keys(godsightStorage["battles"]);
  const [selectedBattle, setSelectedBattle] = useState<string | undefined>(undefined);

  const manifest = chrome.runtime.getManifest();
  return (
    <>
      <div className="version-header">
        <a href="https://github.com/dou8le88/godsight" target="_blank" rel="noopener noreferrer">
          Godsight version {manifest["version"]}
        </a>
      </div>
      {!onGbfPage ? (
        <WrongWebsiteBanner />
      ) : (
        <>
          {selectedBattle ? (
            <BattleTracker battleData={godsightStorage["battles"][selectedBattle]} />
          ) : (
            <>
              {allBattles.length > 0 ? (
                <>
                  {allBattles.map(battle =>
                    <BattleSummary key={battle} battleData={godsightStorage["battles"][battle]} onClick={() => setSelectedBattle(battle)} deleteEntry={() => storageManager.deleteBattle(battle)} />
                  )}
                </>
              ) : (
                <>No battles recorded. Start a raid battle to record data.</>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}