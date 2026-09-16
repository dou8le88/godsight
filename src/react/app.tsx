import { useEffect, useState } from "react";
import WrongWebsiteBanner from "./wrongwebsitebanner";
import { GranblueBattleData } from "../gbf/battletypes/battledata";
import { StartData } from "../gbf/battletypes/startdata";
import BattleTracker from "./battletracker/battletracker";
import { BattleScenarioParser } from "../battlescenarioparser";
import { useGodsightStorage } from "./battletracker/usegodsightstorage";
import { GodsightStorageManager } from "../godsight/godsightstorage/godsightstoragemanager";
import BattleSummary from "./battletracker/battlesummary";
import { StatsUpdateHelper } from "../godsight/battletypes/stats";
import { GodsightBattleData } from "../godsight/battletypes/battledata";
import { BattleActionParser } from "../godsight/battletypes/battleactionparser";
import SearchHandler from "./search/searchhandler";

export default function GodsightPanel() {
  const validHosts = [
    "game.granbluefantasy.jp",
    "steam.granbluefantasy.jp"
  ];

  // /rest/raid/*.json for solo battles/free quests.
  // /rest/multiraid/*.json for multiplayer battles.
  const battleApiRegex = /^\/rest\/(?:multi)?raid/;

  // raid/123456
  // raid_multi/123456
  const battleIdRegex = /^raid(?:_multi)?\/(\d+)/;

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
      console.info(`Got start data for ${endpoint}`);

      const godsightBattleData = battleScenarioParser.parseStartData(data);
      const raidId = godsightBattleData["raidId"];

      const existingRaid = godsightStorage.battles[raidId];

      if (existingRaid) {
        // An existing raid means that the new battleData shouldn't have any actions in it.
        godsightBattleData["turnData"] = existingRaid["turnData"];
        godsightBattleData["honors"] = existingRaid["honors"];
      }

      setSelectedBattle(String(raidId));
      storageManager.setBattleData(raidId, godsightBattleData);
    }

    function withActiveBattle(callback: (battleId: string, raid: GodsightBattleData) => void) {
      chrome.devtools.inspectedWindow.eval("window.location.hash", (url: string) => {
        const fragment = url.split("#").at(-1);
        const battleId = ((fragment || "").match(battleIdRegex) || []).at(-1);

        if (battleId) {
          const raid = godsightStorage["battles"][battleId];
          if (raid) {
            const raidCopy = structuredClone(raid);
            Object.keys(raidCopy["turnData"]).forEach(turnNumber => {
              raidCopy["turnData"][turnNumber]["turnActions"] = raidCopy["turnData"][turnNumber]["turnActions"].map(action => {
                const rehydratedAction = BattleActionParser.fromJSON(action);
                if (rehydratedAction) {
                  return rehydratedAction;
                } else {
                  return action;
                }
              });
            });
            callback(battleId, raidCopy);
          } else {
            console.warn("Unable to record battle actions: no known active battle (refresh the battle while the Godsight panel is open)");
          }
        } else {
          console.error("Couldn't determine the active battle.");
        }
      });
    }

    function battleDataHandler(data: GranblueBattleData, endpoint: string) {
      console.info(`Got battle data for ${endpoint}`);

      withActiveBattle((battleId, raid) => {
        const currentTurnNumber = raid["currentTurn"];
        let currentTurn = raid["turnData"][currentTurnNumber];

        if (!currentTurn) {
          raid["turnData"][currentTurnNumber] = {
            "turnStats": StatsUpdateHelper.getEmptyStats(),
            "characterCurrentTurnStats": {},
            "turnActions": [],
          }

          currentTurn = raid["turnData"][currentTurnNumber];
        }

        const existingTurnActions = currentTurn["turnActions"];
        let currentActionNumber = 0;
        if (existingTurnActions.length > 0) {
          let lastAction = (existingTurnActions.at(-1) || existingTurnActions.at(0))!;
          if (lastAction.subactions.length) {
            lastAction = (lastAction.subactions.at(-1) || lastAction.subactions.at(0))!;
          }
          currentActionNumber = lastAction["actionNumber"] + 1;
        }

        const newActions = battleScenarioParser.parseScenarioData(data["scenario"], data, raid, currentActionNumber);
        const newTurnData = battleScenarioParser.processTurnActionData(newActions, raid["party"]);

        // Merge previous actions and stats into the new stuff.
        // First merge the new data into the raidwide data.
        StatsUpdateHelper.mergeStats(newTurnData["turnStats"], raid["battleStats"]["generalStats"]);
        Object.keys(newTurnData["characterCurrentTurnStats"]).forEach(characterIndex => {
          StatsUpdateHelper.mergeStats(
            newTurnData["characterCurrentTurnStats"][characterIndex],
            raid["battleStats"]["characterStats"][characterIndex],
          );
        });

        // Then merge the new turn stats into the existing turn stats
        StatsUpdateHelper.mergeStats(currentTurn["turnStats"], newTurnData["turnStats"]);
        Object.keys(currentTurn["characterCurrentTurnStats"]).forEach(characterIndex => {
          StatsUpdateHelper.mergeStats(
            currentTurn["characterCurrentTurnStats"][characterIndex],
            newTurnData["characterCurrentTurnStats"][characterIndex],
          );
        });

        // Then merge the old actions into the new ones.
        newTurnData["turnActions"] = existingTurnActions.concat(newTurnData["turnActions"]);
        raid["turnData"][currentTurnNumber] = newTurnData;

        if ("updateTurnTo" in raid) {
          raid["currentTurn"] = raid["updateTurnTo"]!;
          delete raid["updateTurnTo"];
        }

        storageManager.setBattleData(Number(battleId), raid);
      });
    }

    function retryBattleHandler() {
      // This actually starts a new battle so we don't really need to do anything.
      // TODO: maybe update the battle status of the previous battle.
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

          request.getContent((content) => {
            const endpoint = url.pathname.split("/").at(-1);

            switch (endpoint) {
              // Battle actions.
              case "ability_result.json":
              case "fatal_chain_result.json":
              case "normal_attack_result.json":
              case "summon_result.json":
              case "temporary_item_result.json":
              case "user_recovery.json":
              case "retire.json":
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

              case "retry_trialbattle.json":
                // Restarting a trial battle
                retryBattleHandler();
                return;
              // Misc configuration endpoints that don't contain battle info.
              case "setting":
              case "auto_setting":
              case "special_skill_setting":
              case "vote_abort.json":
              case "showed_vote_result.json":
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
  }, [onGbfPage, godsightStorage]);

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
            <>
              <BattleTracker battleData={godsightStorage["battles"][selectedBattle]} />
              <SearchHandler />
            </>
          ) : (
            <>
              {allBattles.length > 0 ? (
                <>
                  {allBattles.map(battle =>
                    <BattleSummary key={battle} battleData={godsightStorage["battles"][battle]} onClick={() => setSelectedBattle(battle)} deleteEntry={() => storageManager.deleteBattle(battle)} />
                  )}
                </>
              ) : (
                <div>No battles recorded. Start a raid battle, or refresh an active raid to start recording data.</div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}