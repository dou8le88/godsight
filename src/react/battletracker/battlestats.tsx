import { useState } from "react";
import { GodsightBattleData } from "../../godsight/battletypes/battledata";
import { RetreatAction } from "../../godsight/battletypes/retreataction";
import { Stats, StatsUpdateHelper } from "../../godsight/battletypes/stats";
import { StatsShower } from "./statsshower";
import { StatsView } from "./statsview";
import { DeepDivePieGraph } from "./deepdivepiegraph";
import { Breakdown } from "./breakdown";
import { TimeSeries } from "./timeseries";
import { ByCharacterPieGraph } from "./bycharacterpiegraph";

export function BattleStats({ battleData }: { battleData: GodsightBattleData | undefined }) {
  if (!battleData) {
    return <div>No battle data available yet.</div>;
  } else {
    const frontliners = battleData["party"]["frontline"];

    const backliners = battleData["party"]["backline"];

    const turnSet = new Set(Object.keys(battleData["turnData"]).map(t => Number(t)));
    turnSet.add(battleData["currentTurn"]);
    const turns = [...turnSet.values()].sort((a, b) => a - b);

    const currentTurnIndex = turns.findIndex(t => t == battleData["currentTurn"]);
    const lastTurnIndex = currentTurnIndex != -1 ? currentTurnIndex - 1 : -1;

    const totalStats = battleData["battleStats"]["generalStats"];

    const currentTurn = battleData["turnData"][battleData["currentTurn"]];
    const previousTurn = battleData["turnData"][turns[lastTurnIndex]];

    const currentTurnStats = currentTurn ? currentTurn["turnStats"] : StatsUpdateHelper.getEmptyStats();
    const previousTurnStats = previousTurn ? previousTurn["turnStats"] : StatsUpdateHelper.getEmptyStats();

    const allCharacterStats = battleData["battleStats"]["characterStats"];
    const currentTurnCharacterStats = currentTurn ? currentTurn["characterCurrentTurnStats"] : {};
    const previousTurnCharacterStats = previousTurn ? previousTurn["characterCurrentTurnStats"] : {};

    const previousTurnNumber = lastTurnIndex != -1 ? `${turns[lastTurnIndex]}` : "??";

    const currenTurnHasActions = currentTurn ?
      currentTurn["turnActions"] && currentTurn["turnActions"].length &&
      !(currentTurn["turnActions"][0] instanceof RetreatAction) : false;

    const turnsWithData = currenTurnHasActions ? (turns.filter(t => t != 0)).length : turns.length - 1;
    const damagePerTurnStats = structuredClone(totalStats);

    StatsUpdateHelper.divideStatsBy(damagePerTurnStats, turnsWithData || 1);

    const characterDamagePerTurnStats = structuredClone(allCharacterStats);
    Object.keys(characterDamagePerTurnStats).forEach((charIdx) => {
      StatsUpdateHelper.divideStatsBy(characterDamagePerTurnStats[charIdx], turnsWithData || 1);
    });

    const [selectedStatsView, setSelectedStatsView] = useState<StatsView | undefined>(undefined);
    const [selectedCharacter, setSelectedCharacter] = useState<number>(0);

    const views = {
      [StatsView.TOTAL]: totalStats,
      [StatsView.DPT]: damagePerTurnStats,
      [StatsView.CURRENT_TURN]: currentTurnStats,
      [StatsView.PREV_TURN]: previousTurnStats,
      [StatsView.CHARACTER]: battleData["battleStats"]["characterStats"],
    };
    const byCharacterViews: Record<StatsView, Record<string | number, Stats>> = {
      [StatsView.TOTAL]: allCharacterStats,
      [StatsView.DPT]: characterDamagePerTurnStats,
      [StatsView.CURRENT_TURN]: currentTurnCharacterStats,
      [StatsView.PREV_TURN]: previousTurnCharacterStats,
      [StatsView.CHARACTER]: {},
    }
    const viewNames = {
      [StatsView.TOTAL]: "Party Damage Breakdown",
      [StatsView.DPT]: "Average DPT Breakdown",
      [StatsView.CURRENT_TURN]: "Current Turn Breakdown",
      [StatsView.PREV_TURN]: "Previous Turn Breakdown",
      [StatsView.CHARACTER]: `${battleData["party"]["members"][selectedCharacter]["name"]}'s Damage Breakdown`,
    };

    const [selectedBreakdown, setSelectedBreakdown] = useState(Breakdown.BY_TYPE);

    return (
      <>
        <div className="battle-metadata">Raid #{battleData["raidId"]}: vs {battleData["boss"][0]["name"]}</div>
        {selectedStatsView !== undefined ?
          <>
            <div className="breakdown-name">{viewNames[selectedStatsView]}</div>
            <div className="breakdown-header">
              <div className="exit-breakdown-button" onClick={() => setSelectedStatsView(undefined)}>X</div>
            </div>
            <div className="breakdown-selector-container">
              <div
                className={selectedBreakdown == Breakdown.BY_TYPE ? "breakdown-option selected" : "breakdown-option"}
                onClick={() => setSelectedBreakdown(Breakdown.BY_TYPE)}
              >Type</div>
              <div
                className={selectedBreakdown == Breakdown.BY_ELEMENT ? "breakdown-option selected" : "breakdown-option"}
                onClick={() => setSelectedBreakdown(Breakdown.BY_ELEMENT)}
              >Element</div>
              {selectedStatsView != StatsView.CHARACTER ?
                <div
                  className={selectedBreakdown == Breakdown.BY_CHARACTER ? "breakdown-option selected" : "breakdown-option"}
                  onClick={() => setSelectedBreakdown(Breakdown.BY_CHARACTER)}
                >Character</div> :
                <></>
              }
              {selectedStatsView != StatsView.CURRENT_TURN && selectedStatsView != StatsView.PREV_TURN && selectedStatsView != StatsView.DPT ?
                <div
                  className={selectedBreakdown == Breakdown.BY_TURN ? "breakdown-option selected" : "breakdown-option"}
                  onClick={() => setSelectedBreakdown(Breakdown.BY_TURN)}
                >Turn</div> : <></>
              }
            </div>
            {selectedBreakdown == Breakdown.BY_TYPE || selectedBreakdown == Breakdown.BY_ELEMENT ?
              <DeepDivePieGraph
                stats={selectedStatsView == StatsView.CHARACTER ?
                  views[selectedStatsView][selectedCharacter] : views[selectedStatsView]}
                breakdown={selectedBreakdown}
              /> : selectedBreakdown == Breakdown.BY_TURN ?
                <TimeSeries
                  battleData={battleData}
                  view={selectedStatsView}
                  characterIndex={selectedCharacter}
                /> : selectedBreakdown == Breakdown.BY_CHARACTER ?
                  <ByCharacterPieGraph
                    battleData={battleData}
                    characterStats={byCharacterViews[selectedStatsView]}
                  /> :
                  <></>
            }
          </> :
          <>
            <div className="battle-stats-instructions">Click any tile for visualizations.</div>
            <div className="battle-stats-summary-container">
              <StatsShower
                stats={totalStats}
                header={"Totals"}
                onClick={() => setSelectedStatsView(StatsView.TOTAL)}
              />
              <StatsShower
                stats={damagePerTurnStats}
                header={"Average DPT"}
                onClick={() => {
                  setSelectedStatsView(StatsView.DPT)
                  if (selectedBreakdown == Breakdown.BY_TURN) {
                    setSelectedBreakdown(Breakdown.BY_TYPE);
                  }
                }}
              />
              <StatsShower
                stats={previousTurnStats}
                header={`Previous Turn (${previousTurnNumber})`}
                onClick={() => {
                  setSelectedStatsView(StatsView.PREV_TURN);
                  if (selectedBreakdown == Breakdown.BY_TURN) {
                    setSelectedBreakdown(Breakdown.BY_TYPE);
                  }
                }}
              />
              <StatsShower
                stats={currentTurnStats}
                header={`Current Turn (${battleData["currentTurn"]})`}
                onClick={() => {
                  setSelectedStatsView(StatsView.CURRENT_TURN);
                  if (selectedBreakdown == Breakdown.BY_TURN) {
                    setSelectedBreakdown(Breakdown.BY_TYPE);
                  }
                }}
              />
            </div>
            <hr className="divider" />
            <div className="battle-stats-summary-container">
              {frontliners.map((charIdx) => (
                <StatsShower
                  key={charIdx}
                  stats={battleData["battleStats"]["characterStats"][charIdx]}
                  header={battleData["party"]["members"][charIdx]["name"]}
                  character={battleData["party"]["members"][charIdx]}
                  onClick={() => {
                    setSelectedStatsView(StatsView.CHARACTER);
                    setSelectedCharacter(charIdx);
                  }}
                />
              ))}
            </div>
            <div className="battle-stats-summary-container">
              {backliners.map((charIdx) => (
                <StatsShower
                  key={charIdx}
                  stats={battleData["battleStats"]["characterStats"][charIdx]}
                  header={battleData["party"]["members"][charIdx]["name"]}
                  character={battleData["party"]["members"][charIdx]}
                  backline={true}
                  onClick={() => {
                    setSelectedStatsView(StatsView.CHARACTER);
                    setSelectedCharacter(charIdx);
                  }}
                />
              ))}
            </div>
          </>
        }
      </>
    );
  }
}