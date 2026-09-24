import { GodsightBattleData } from "../../godsight/battletypes/battledata";
import { RetreatAction } from "../../godsight/battletypes/retreataction";
import { StatsUpdateHelper } from "../../godsight/battletypes/stats";
import { StatsShower } from "./statsshower";

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

    const previousTurnNumber = lastTurnIndex != -1 ? `${turns[lastTurnIndex]}` : "??";

    const currenTurnHasActions = currentTurn ?
      currentTurn["turnActions"] && currentTurn["turnActions"].length &&
      !(currentTurn["turnActions"][0] instanceof RetreatAction) : false;

    const turnsWithData = currenTurnHasActions ? (turns.filter(t => t != 0)).length : turns.length - 1;
    const damagePerTurnStats = structuredClone(totalStats);

    StatsUpdateHelper.divideStatsBy(damagePerTurnStats, turnsWithData || 1);

    return (
      <>
        <div className="battle-metadata">Raid #{battleData["raidId"]}: vs {battleData["boss"][0]["name"]}</div>
        <div className="battle-stats-summary-container">
          <StatsShower stats={totalStats} header={"Totals"} />
          <StatsShower stats={damagePerTurnStats} header={"Damage Per Turn"} />
          <StatsShower
            stats={previousTurnStats}
            header={`Previous Turn (${previousTurnNumber})`}
          />
          <StatsShower
            stats={currentTurnStats}
            header={`Current Turn (${battleData["currentTurn"]})`}
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
            />
          ))}
        </div>
      </>
    );
  }
}