import { GodsightBattleData } from "../../godsight/battletypes/battledata";
import Avatar from "./avatar";
import Turn from "./turn";

export function TurnTracker({ battleData }: { battleData: GodsightBattleData | undefined }) {
  if (!battleData) {
    return <div>No battle data available yet.</div>;
  } else {
    const frontliners = battleData["party"]["frontline"].map(
      partyMemberIndex => battleData["party"]["members"][partyMemberIndex]
    );

    const backliners = battleData["party"]["backline"].map(
      partyMemberIndex => battleData["party"]["members"][partyMemberIndex]
    );

    const turns = Object.keys(battleData["turnData"]);

    return (
      <>
        <div className="battle-metadata">Vs. {battleData["boss"][0]["name"]}</div>
        <div className="party-container">
          {frontliners.map(char => {
            return (
              <Avatar key={char["characterId"]} characterData={char} />
            );
          })}
          {backliners.map(char => {
            return (
              <Avatar key={char["characterId"]} characterData={char} />
            );
          })}
        </div>
        <div className="turn-container">
          {turns.length > 0 ? (
            <>
              {turns.map(turnNumber => {
                return (
                  <Turn key={turnNumber} turnData={battleData["turnData"][turnNumber]} turnNumber={Number(turnNumber)} />
                );
              })}
            </>
          ) : (
            <>No turn data available.</>
          )}
        </div>
      </>
    )
  }
}