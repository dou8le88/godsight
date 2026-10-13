import { GodsightBattleData } from "../../godsight/battletypes/battledata";
import { useState } from "react";
import { TurnTracker } from "./turntracker";
import { BattleStats } from "./battlestats";
import { useGodsightSettings } from "../../godsight/settings/usegodsightsettings";
import { BattleViewTab, DefaultBattleView } from "../../godsight/settings/godsightsettings";
import { SettingsManager } from "../../godsight/settings/settingsmanager";



export default function BattleTracker({ battleData }: { battleData: GodsightBattleData | undefined }) {
  const settings = useGodsightSettings();
  const settingsManager = SettingsManager.getInstance();

  let initialTab = BattleViewTab.STATS;
  switch (settings["defaultBattleView"]) {
    case DefaultBattleView.LAST_SELECTION:
      if (settings["lastSelectedBattleView"] !== undefined) {
        initialTab = settings["lastSelectedBattleView"];
      }
      break;
    case DefaultBattleView.STATS:
      initialTab = BattleViewTab.STATS;
      break;
    case DefaultBattleView.TURN_ACTIONS:
      initialTab = BattleViewTab.TURN_ACTIONS;
      break;
  }

  const [selectedTab, setSelectedTab] = useState(initialTab);


  const isMissingAbilities: boolean = battleData !== undefined ?
    battleData["abilityTurns"].length < ((battleData["abilityTurns"].at(-1) || 0) + 1) : false;
  const isMissingFinishedTurns: boolean = battleData !== undefined ?
    battleData["turnsWithSkippedOrRecordedAttackActions"].length <
    (battleData["currentTurn"] - 1) : false;

  const bossName = battleData !== undefined ? battleData["boss"][0]["name"] : "Unknown";
  const crossTabHeader = (
    <div className="battle-metadata">
      Vs. {bossName}&nbsp;
      {(isMissingAbilities || isMissingFinishedTurns) ?
        <span className="missing-info-warning" title="Missing battle data detected. The stats and actions shown may not match the ingame battle log.">
          ⚠
        </span> :
        <></>
      }
    </div>
  )

  return (
    <div className="battle-info">
      <div className="tab-header">
        <div className="end-spacer"></div>
        <div className={selectedTab == BattleViewTab.STATS ? "tab selected" : "tab"} onClick={() => {
          setSelectedTab(BattleViewTab.STATS);
          if (settings["defaultBattleView"] == DefaultBattleView.LAST_SELECTION) {
            settingsManager.updateSingleSetting("lastSelectedBattleView", BattleViewTab.STATS);
          }
        }}>Stats</div>
        <div className="middle-spacer"></div>
        <div className={selectedTab == BattleViewTab.TURN_ACTIONS ? "tab selected" : "tab"} onClick={() => {
          setSelectedTab(BattleViewTab.TURN_ACTIONS);
          if (settings["defaultBattleView"] == DefaultBattleView.LAST_SELECTION) {
            settingsManager.updateSingleSetting("lastSelectedBattleView", BattleViewTab.TURN_ACTIONS);
          }
        }}>Turn Actions</div>
        <div className="end-spacer"></div>
      </div>
      <div className="tab-container" style={{ "display": selectedTab == BattleViewTab.STATS ? "flex" : "none" }}>
        {crossTabHeader}
        <BattleStats battleData={battleData} />
      </div>
      <div className="tab-container" style={{ "display": selectedTab == BattleViewTab.TURN_ACTIONS ? "flex" : "none" }}>
        {crossTabHeader}
        <TurnTracker battleData={battleData} />
      </div>
    </div>
  );
}