import { JSX } from "react/jsx-runtime";
import { GodsightBattleData } from "../../godsight/battletypes/battledata";
import Avatar from "./avatar";

export default function BattleTracker({ battleData }: { battleData: GodsightBattleData | undefined }) {
  let output: JSX.Element;
  if (!battleData) {
    output = <div>No battle data available yet.</div>
  } else {
    const frontliners = battleData.party.frontline.map(
      partyMemberIndex => battleData.party.members[partyMemberIndex]
    );

    const backliners = battleData.party.backline.map(
      partyMemberIndex => battleData.party.members[partyMemberIndex]
    );

    output = (
      <>
        <div className="battle-metadata">Raid #{battleData.raidId}: vs {battleData.boss[0].name}</div>
        <div className="party-wrapper">
          {frontliners.map(char => {
            return (
              <Avatar key={char.characterId} characterData={char} />
            );
          })}
          {backliners.map(char => {
            return (
              <Avatar key={char.characterId} characterData={char} />
            );
          })}
        </div>
        <div className="turn-history">
          Turn data here.
        </div>
      </>
    );
  }

  return (
    <div className="battle-info">
      {output}
    </div>
  );
}