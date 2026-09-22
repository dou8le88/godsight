import { GodsightBattleData } from "../../godsight/battletypes/battledata";
import { StatsUpdateHelper } from "../../godsight/battletypes/stats";
import { StatsShower } from "./statsshower";

export function BattleStats({ battleData }: { battleData: GodsightBattleData | undefined }) {
  if (!battleData) {
    return <div>No battle data available yet.</div>;
  } else {
    const frontliners = battleData["party"]["frontline"].map(
      partyMemberIndex => battleData["party"]["members"][partyMemberIndex]
    );

    const backliners = battleData["party"]["backline"].map(
      partyMemberIndex => battleData["party"]["members"][partyMemberIndex]
    );

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

    const turnsWithData = currentTurn ? turns.length : turns.length - 1;
    const damagePerTurnStats = structuredClone(totalStats);

    StatsUpdateHelper.divideStatsBy(damagePerTurnStats, turnsWithData);

    return (
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
    );
  }
}