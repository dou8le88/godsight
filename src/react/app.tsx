import { startTransition, useEffect, useState } from 'react';
import { produce } from 'immer';
import WrongWebsiteBanner from './wrongwebsitebanner';
import { GranblueBattleData } from '../gbf/battletypes/battledata';
import { StartData } from '../gbf/battletypes/startdata';
import BattleTracker from './battletracker/battletracker';
import { BattleScenarioParser } from '../battlescenarioparser';
import { useGodsightStorage } from '../godsight/godsightstorage/usegodsightstorage';
import { GodsightStorageManager } from '../godsight/godsightstorage/godsightstoragemanager';
import BattleSummary from './battletracker/battlesummary';
import { StatsUpdateHelper } from '../godsight/battletypes/stats';
import { GodsightBattleData } from '../godsight/battletypes/battledata';
import { Config } from './config/config';
import { useGodsightSettings } from '../godsight/settings/usegodsightsettings';
import {
  GodsightNotification,
  Notification,
  NotificationType,
} from './notifications/notification';
import {
  GameLanguage,
  OnRaidLoadBehavior,
} from '../godsight/settings/godsightsettings';
import SearchHandler from './search/searchhandler';
import { range } from '../util/range';
import { Toolbar } from './config/toolbar';
import { SettingsManager } from '../godsight/settings/settingsmanager';
import { JPLanguageTest } from '../util/jplanguagetest';
import { z } from 'zod';

const NoKnownActiveBattleNotificationKey = 'NoKnownActiveBattle';
const LoadedIntoRaidNotificationKey = 'LoadedIntoRaid';
const DeleteAllStoredDataNotificationKey = 'DeleteAllStoredData';

const validHosts = ['game.granbluefantasy.jp', 'steam.granbluefantasy.com'];

// /rest/raid/*.json for solo battles/free quests.
// /rest/multiraid/*.json for multiplayer battles.
const battleApiRegex = /^\/rest\/(?:multi)?raid/;

// raid/123456
// raid_multi/123456
const battleIdRegex = /^raid(?:_multi)?\/(\d+)/;

export default function GodsightPanel() {
  // Find out if we're inspecting a GBF page.
  const [onGbfPage, setOnGbfPage] = useState(false);
  useEffect(() => {
    function notifyStateOfInspectedPage(url: string) {
      const tabUrl = new URL(url);
      if (validHosts.some((h) => tabUrl.host.startsWith(h))) {
        setOnGbfPage(true);
      } else if (!validHosts.some((h) => tabUrl.host.startsWith(h))) {
        setOnGbfPage(false);
      }
    }
    // check on opening devtools if we're inspecting GBF.
    chrome.devtools.inspectedWindow.eval(
      'window.location.href',
      (url: string) => {
        notifyStateOfInspectedPage(url);
      },
    );

    chrome.devtools.network.onNavigated.addListener(notifyStateOfInspectedPage);

    // Clean up listeners on component unmount
    return () => {
      chrome.devtools.network.onNavigated.removeListener(
        notifyStateOfInspectedPage,
      );
    };
  }, []);

  const storageManager = GodsightStorageManager.getInstance();
  const godsightStorage = useGodsightStorage();

  const settingsManager = SettingsManager.getInstance();
  const settings = useGodsightSettings();

  const [notifications, setNotifications] = useState<GodsightNotification[]>(
    [],
  );

  // Clear notifications when they expire.
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (notifications.some((n) => n.expiration <= Date.now())) {
        startTransition(() => {
          setNotifications(
            [...notifications].filter((n) => n.expiration > Date.now()),
          );
        });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [notifications]);

  const [selectedBattle, setSelectedBattle] = useState<number | undefined>(
    undefined,
  );
  const [lastUpdatedBattle, setLastUpdatedBattle] = useState<
    number | undefined
  >(undefined);

  // Only listen for network requests when we're inspecting GBF.
  useEffect(() => {
    if (!onGbfPage) return;
    const battleScenarioParser = new BattleScenarioParser(settings);

    function startDataHandler(data: StartData, endpoint: string) {
      console.info(`Got start data for ${endpoint}`);

      const mainCharacter = data['player']['param'][0];
      if (mainCharacter) {
        if (
          (JPLanguageTest.containsJapaneseRegex.test(
            mainCharacter['special_skill'],
          ) ||
            JPLanguageTest.containsJapaneseRegex.test(
              mainCharacter['special_comment'],
            )) &&
          settings['gameLanguage'] != GameLanguage.JA
        ) {
          settingsManager.updateSingleSetting('gameLanguage', GameLanguage.JA);
          // Also update the language for the current parse.
          settings['gameLanguage'] = GameLanguage.JA;
        } else if (
          !JPLanguageTest.containsJapaneseRegex.test(
            mainCharacter['special_skill'],
          ) &&
          !JPLanguageTest.containsJapaneseRegex.test(
            mainCharacter['special_comment'],
          ) &&
          settings['gameLanguage'] != GameLanguage.EN
        ) {
          settingsManager.updateSingleSetting('gameLanguage', GameLanguage.EN);
          // Also update the language for the current parse.
          settings['gameLanguage'] = GameLanguage.EN;
        }
      }

      const godsightBattleData = battleScenarioParser.parseStartData(
        data,
        settings['mainCharacterNameOverride'],
      );
      const raidId = godsightBattleData['raidId'];

      const existingRaid = godsightStorage['battles'].find(
        (b) => b['raidId'] == raidId,
      );

      if (existingRaid) {
        // An existing raid means that the new battleData shouldn't have any actions in it.
        godsightBattleData['turnData'] = existingRaid['turnData'];
        godsightBattleData['honors'] = existingRaid['honors'];
        godsightBattleData['battleStats'] = existingRaid['battleStats'];
        const abilityTurns = [...existingRaid['abilityTurns']];
        godsightBattleData['abilityTurns'].forEach((t) => {
          if (t !== null && t !== undefined && !abilityTurns.includes(t)) {
            abilityTurns.push(t);
          }
        });
        godsightBattleData['abilityTurns'] = abilityTurns;
        godsightBattleData['turnsWithSkippedOrRecordedAttackActions'] =
          existingRaid['turnsWithSkippedOrRecordedAttackActions'];
        godsightBattleData['skippedActionsDueToParseErrors'] =
          existingRaid['skippedActionsDueToParseErrors'];

        godsightBattleData['firstRecorded'] = existingRaid['firstRecorded'];
        godsightBattleData['lastUpdated'] = existingRaid['lastUpdated'];
      }

      if ('updateTurnTo' in godsightBattleData) {
        godsightBattleData['currentTurn'] = godsightBattleData['updateTurnTo']!;
        delete godsightBattleData['updateTurnTo'];
      }

      storageManager.setBattleData(
        raidId,
        godsightBattleData,
        settings['maxRememberedBattles'],
      );
      setLastUpdatedBattle(raidId);

      switch (settings['onRaidLoadBehavior']) {
        case OnRaidLoadBehavior.SWITCH:
          setSelectedBattle(raidId);
          break;

        case OnRaidLoadBehavior.NOTIFY: {
          if (selectedBattle != raidId) {
            const thisRaidNotificationKey = `${LoadedIntoRaidNotificationKey}-${raidId}`;
            if (!notifications.some((n) => n.key == thisRaidNotificationKey)) {
              const updatedNotifications = [...notifications];

              updatedNotifications.unshift({
                key: thisRaidNotificationKey,
                type: NotificationType.INFO,
                message: `New raid battle detected vs ${godsightBattleData['boss'][0]['name']}!`,
                expiration: Date.now() + 100 * 1000,
                action: {
                  buttonText: 'View',
                  onClick: () => {
                    setSelectedBattle(raidId);
                    startTransition(() => {
                      setNotifications(
                        [...notifications].filter(
                          (n) => n.key != thisRaidNotificationKey,
                        ),
                      );
                    });
                  },
                },
              });

              startTransition(() => {
                setNotifications(updatedNotifications);
              });
            }
          }
          break;
        }

        case OnRaidLoadBehavior.NO_ACTION:
          break;
      }
    }

    function withActiveBattle(
      callback: (battleId: number, raid: GodsightBattleData) => void,
    ) {
      chrome.devtools.inspectedWindow.eval(
        'window.location.hash',
        (url: string | undefined) => {
          let battleId = NaN;
          if (url) {
            const fragment = url.split('#').at(-1);
            battleId = Number(
              ((fragment || '').match(battleIdRegex) || []).at(-1),
            );
          } else if (lastUpdatedBattle !== undefined) {
            battleId = lastUpdatedBattle;
          }

          if (!isNaN(battleId)) {
            const raid = godsightStorage['battles'].find(
              (b) => b['raidId'] == battleId,
            );
            if (raid) {
              callback(battleId, raid);
            } else {
              if (
                !notifications.some(
                  (n) => n.key == NoKnownActiveBattleNotificationKey,
                )
              ) {
                const updatedNotifications = [...notifications];

                updatedNotifications.unshift({
                  key: NoKnownActiveBattleNotificationKey,
                  type: NotificationType.ERROR,
                  message:
                    'Got battle data for unknown battle, please refresh the battle while Godsight is open.',
                  expiration: Date.now() + 10 * 1000,
                });

                startTransition(() => {
                  setNotifications(updatedNotifications);
                });
              }
            }
          } else {
            console.error("Couldn't determine the active battle.");
          }
        },
      );
    }

    function battleDataHandler(
      data: GranblueBattleData,
      endpoint: string | undefined,
    ) {
      console.info(`Got battle data for ${endpoint}`);

      withActiveBattle((battleId, raid) => {
        const updatedRaid = produce(raid, (draft) => {
          const currentTurnNumber = draft['currentTurn'];
          let currentTurn = draft['turnData'][currentTurnNumber];

          if (!currentTurn) {
            draft['turnData'][currentTurnNumber] = {
              'turnStats': StatsUpdateHelper.getEmptyStats(),
              'beforeBossTurnStats': StatsUpdateHelper.getEmptyStats(),
              'characterCurrentTurnStats': {},
              'characterBeforeBossTurnStats': {},
              'turnActions': [],
            };

            currentTurn = draft['turnData'][currentTurnNumber];
          }

          const existingTurnActions = currentTurn['turnActions'];

          const newActions = data['scenario']
            ? battleScenarioParser.parseScenarioData(
                data['scenario'],
                data,
                draft,
              )
            : [];
          const newTurnData = battleScenarioParser.processTurnActionData(
            newActions,
            draft['party'],
          );

          battleScenarioParser.updateSummonCooldowns(draft, data);

          if (
            data['status'] &&
            data['status']['ability_turn'] !== null &&
            data['status']['ability_turn'] !== undefined &&
            !draft['abilityTurns'].includes(data['status']['ability_turn'])
          ) {
            draft['abilityTurns'].push(data['status']['ability_turn']);
          }

          // Merge previous actions and stats into the new stuff.
          // First merge the new data into the raidwide data.
          StatsUpdateHelper.mergeStats(
            newTurnData['turnStats'],
            draft['battleStats']['generalStats'],
          );
          Object.keys(newTurnData['characterCurrentTurnStats']).forEach(
            (characterIndex) => {
              StatsUpdateHelper.mergeStats(
                newTurnData['characterCurrentTurnStats'][characterIndex],
                draft['battleStats']['characterStats'][characterIndex],
              );
            },
          );

          // Then merge the new turn stats into the existing turn stats
          StatsUpdateHelper.mergeStats(
            currentTurn['turnStats'],
            newTurnData['turnStats'],
          );
          StatsUpdateHelper.mergeStats(
            currentTurn['beforeBossTurnStats'],
            newTurnData['beforeBossTurnStats'],
          );
          Object.keys(currentTurn['characterCurrentTurnStats']).forEach(
            (characterIndex) => {
              StatsUpdateHelper.mergeStats(
                currentTurn['characterCurrentTurnStats'][characterIndex],
                newTurnData['characterCurrentTurnStats'][characterIndex],
              );
              StatsUpdateHelper.mergeStats(
                currentTurn['characterBeforeBossTurnStats'][characterIndex],
                newTurnData['characterBeforeBossTurnStats'][characterIndex],
              );
            },
          );

          // Then merge the old actions into the new ones.
          newTurnData['turnActions'] = existingTurnActions.concat(
            newTurnData['turnActions'],
          );
          draft['turnData'][currentTurnNumber] = newTurnData;

          draft['lastUpdated'] = Date.now();

          if ('updateTurnTo' in draft) {
            const updatedTurn = draft['updateTurnTo']!;
            const turns = range(draft['currentTurn'], updatedTurn - 1);
            turns.forEach((t) => {
              if (
                !draft['turnsWithSkippedOrRecordedAttackActions'].includes(t)
              ) {
                draft['turnsWithSkippedOrRecordedAttackActions'].push(t);
              }
            });

            draft['currentTurn'] = updatedTurn;
            delete draft['updateTurnTo'];
          }

          // multiwave battles don't always have a turn_change action
          // so we account for that here.
          if (
            endpoint == 'normal_attack_result.json' &&
            draft['totalWaves'] > 1 &&
            draft['currentWave'] < draft['totalWaves'] &&
            draft['boss'].every((b) => b['hpCurrent'] == 0)
          ) {
            if (
              !draft['turnsWithSkippedOrRecordedAttackActions'].includes(
                draft['currentTurn'],
              )
            ) {
              draft['turnsWithSkippedOrRecordedAttackActions'].push(
                draft['currentTurn'],
              );
            }
          }

          if (draft['updateRaidIdTo'] !== undefined) {
            draft['raidId'] = draft['updateRaidIdTo'];
            if (selectedBattle == battleId) {
              setSelectedBattle(draft['raidId']);
            }
            setLastUpdatedBattle(draft['raidId']);
            delete draft['updateRaidIdTo'];
          }
        });

        storageManager.setBattleData(
          Number(battleId),
          updatedRaid,
          settings['maxRememberedBattles'],
        );
      });
    }

    function retryBattleHandler() {
      // This actually starts a new battle so we don't really need to do anything.
    }

    async function onRequestFinishedListener(
      request: chrome.devtools.network.Request,
    ) {
      // Ignore non-GBF requests.
      const url = new URL(request.request.url);
      if (!validHosts.some((h) => url.host == h)) {
        return;
      }

      // Only accept battle data requests.
      if (url.pathname.match(battleApiRegex)) {
        // Ignore failed requests.
        if (request.response.status == 200) {
          request.getContent((content) => {
            const endpoint = url.pathname.split('/').at(-1);

            switch (endpoint) {
              // Battle actions.
              case 'ability_result.json':
              case 'fatal_chain_result.json':
              case 'normal_attack_result.json':
              case 'summon_result.json':
              case 'temporary_item_result.json':
              case 'user_recovery.json':
              case 'retire.json':
              case 'abort_raid.json':
              case 'tower_party_change.json':
              case 'group_gauge_action_result.json':
                try {
                  const body = JSON.parse(content);
                  if (body['scenario']) {
                    const bodyParseResult = GranblueBattleData.safeParse(body);
                    if (!bodyParseResult.success) {
                      console.error(z.prettifyError(bodyParseResult.error));
                    } else {
                      battleDataHandler(bodyParseResult.data, endpoint);
                    }
                  } else if (
                    (body as unknown as { 'popup': unknown })['popup']
                  ) {
                    // "Your HP is too low" or "you don't have the stacks" type popups
                  } else {
                    console.error(
                      `Missing expected scenario data for ${endpoint}, body was ${content}`,
                    );
                  }
                } catch (e: unknown) {
                  console.error(e);
                }
                return;

              case 'start.json':
                // On battle start or on refreshing a page.
                try {
                  const body = JSON.parse(content);
                  const bodyParseResult = StartData.safeParse(body);
                  if (!bodyParseResult.success) {
                    console.error(
                      'Error parsing StartData',
                      z.prettifyError(bodyParseResult.error),
                    );
                  } else {
                    startDataHandler(bodyParseResult.data, endpoint);
                  }
                } catch (e: unknown) {
                  console.error(e);
                }
                return;

              case 'retry_trialbattle.json':
                // Restarting a trial battle
                retryBattleHandler();
                return;

              case 'multi_member_info':
              case 'mvp_info':
                // Contains info about honors, might be useful.
                break;

              // Misc endpoints that don't contain battle info.
              case 'assist_check':
              case 'assist.json':
              case 'auto_setting':
              case 'chat_result.json':
              case 'check_set_time_limit.json':
              case 'get_select_if.json':
              case 'get_union_summon_lock':
              case 'guard_setting.json':
              case 'multi_battle_log':
              case 'setting':
              case 'showed_vote_result.json':
              case 'skip_special_motion_setting.json':
              case 'skip_special_motion_setting_all.json':
              case 'special_skill_setting':
              case 'stamp_list':
              case 'user_battle_log':
              case 'vote_abort.json':
              case '0.json':
              case '1.json':
              case '2.json':
              case '3.json':
              case '4.json':
              case '5.json':
              case '6.json':
              case '7.json':
              case '8.json':
              case '9.json':
                return;
              default:
                if (endpoint !== undefined && !isNaN(Number(endpoint))) {
                  // Battle-specific settings, endpoint is like /rest/raid/setting/123456
                } else {
                  if (content.length) {
                    try {
                      const json = JSON.parse(content);
                      if (json['scenario']) {
                        const bodyParseResult =
                          GranblueBattleData.safeParse(json);
                        if (!bodyParseResult.success) {
                          console.error(
                            `Error parsing battle data from fallback-processed endpoint ${endpoint}`,
                            z.prettifyError(bodyParseResult.error),
                          );
                        } else {
                          console.warn(
                            `Got scenario data from fallback-processed endpoint ${endpoint}`,
                          );
                          battleDataHandler(bodyParseResult.data, endpoint);
                        }
                      } else {
                        console.warn(
                          `Got unknown JSON from fallback-processed endpoint ${endpoint}`,
                          content,
                        );
                      }
                    } catch (e: unknown) {
                      console.warn(
                        `Got non-JSON response when trying to fallback-process ${endpoint}`,
                        e,
                      );
                    }
                  } else {
                    console.warn(`Unhandled battle API endpoint ${endpoint}`);
                  }
                }
                return;
            }
          });
        }
      }
    }

    chrome.devtools.network.onRequestFinished.addListener(
      onRequestFinishedListener,
    );

    return () => {
      chrome.devtools.network.onRequestFinished.removeListener(
        onRequestFinishedListener,
      );
    };
  }, [
    onGbfPage,
    godsightStorage,
    selectedBattle,
    lastUpdatedBattle,
    settings,
    notifications,
    storageManager,
    settingsManager,
  ]);

  const allBattles = godsightStorage['battles'];

  const [showConfig, setShowConfig] = useState(false);

  const manifest = chrome.runtime.getManifest();
  return (
    <>
      <div className="version-header">
        {selectedBattle ? (
          <nav>
            <a
              className="nav-link"
              onClick={() => setSelectedBattle(undefined)}
            >
              &lt; Back to Raids
            </a>
          </nav>
        ) : (
          <></>
        )}
        <a
          className="github-link"
          href="https://github.com/dou8le88/godsight"
          target="_blank"
          rel="noopener noreferrer"
        >
          Godsight version {manifest['version']}
        </a>
      </div>
      <Toolbar onConfigClicked={() => setShowConfig(true)} />
      <div className="notification-bar">
        {notifications.map((notification) => (
          <Notification
            key={notification.key}
            notification={notification}
            onExit={() => {
              startTransition(() => {
                setNotifications(
                  [...notifications].filter((n) => n.key != notification.key),
                );
              });
            }}
          />
        ))}
      </div>
      {showConfig ? (
        <>
          <Config onExit={() => setShowConfig(false)} />
        </>
      ) : (
        <></>
      )}
      {!onGbfPage ? (
        <WrongWebsiteBanner />
      ) : (
        <>
          {selectedBattle ? (
            <BattleTracker
              battleData={godsightStorage['battles'].find(
                (b) => b['raidId'] == selectedBattle,
              )}
            />
          ) : (
            <>
              {allBattles.length > 0 ? (
                <div className="battle-summary-wrapper">
                  {allBattles.map((battle) => (
                    <BattleSummary
                      key={battle['raidId']}
                      battleData={battle}
                      onClick={() => setSelectedBattle(battle['raidId'])}
                      deleteEntry={() =>
                        storageManager.deleteBattle(battle['raidId'])
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-battle-list-banner">
                  No battles recorded. Start a raid battle, or refresh an active
                  raid to start recording data.
                  <br />
                  If you expected to see data here, the underlying schema may
                  have changed.
                  <br />
                  Clicking the button below will delete all stored battle data
                  to attempt to recover.
                  <div
                    className="reset-storage-button"
                    onClick={() => {
                      storageManager.deleteAllBattles();
                      const updatedNotifications = [...notifications];
                      updatedNotifications.unshift({
                        key: DeleteAllStoredDataNotificationKey,
                        type: NotificationType.INFO,
                        message:
                          'Stored data deleted. Start a new battle to begin recording data.',
                        expiration: Date.now() + 5 * 1000,
                      });
                      setNotifications(updatedNotifications);
                    }}
                  >
                    Delete All Stored Battle Data
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
      <SearchHandler />
    </>
  );
}
