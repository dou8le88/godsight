import { GodsightBattleData } from "../../godsight/battletypes/battledata";
import { useState } from "react";
import { TurnTracker } from "./turntracker";
import { BattleStats } from "./battlestats";

enum Tab {
  STATS,
  TURN_ACTIONS,
}

export default function BattleTracker({ battleData }: { battleData: GodsightBattleData | undefined }) {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.STATS);

  return (
    <div className="battle-info">
      <div className="tab-header">
        <div className="end-spacer"></div>
        <div className={selectedTab == Tab.STATS ? "tab selected" : "tab"} onClick={() => setSelectedTab(Tab.STATS)}>Stats</div>
        <div className="middle-spacer"></div>
        <div className={selectedTab == Tab.TURN_ACTIONS ? "tab selected" : "tab"} onClick={() => setSelectedTab(Tab.TURN_ACTIONS)}>Turn Actions</div>
        <div className="end-spacer"></div>
      </div>
      <div className="tab-container" style={{ "display": selectedTab == Tab.STATS ? "flex" : "none" }}>
        <BattleStats battleData={battleData} />
      </div>
      <div className="tab-container" style={{ "display": selectedTab == Tab.TURN_ACTIONS ? "flex" : "none" }}>
        <TurnTracker battleData={battleData} />
      </div>
    </div>
  );
}