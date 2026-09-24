import { GodsightPartyMemberData } from "../../godsight/battletypes/partyformationdata";
import { Stats } from "../../godsight/battletypes/stats";
import Avatar from "./avatar";

export function StatsShower({ stats, header, character }: {
  stats: Stats,
  header?: string,
  character?: GodsightPartyMemberData
}) {
  const totalNormalAttackDamage = Math.round(Object.keys(stats["normalAttackDamage"]).map(element => {
    return stats["normalAttackDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0));

  const totalChargedAttackDamage = Math.round(Object.keys(stats["chargedAttackDamage"]).map(element => {
    return stats["chargedAttackDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0));

  const totalSkillDamage = Math.round(Object.keys(stats["skillDamage"]).map(element => {
    return stats["skillDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0));

  const totalOtherDamage = Math.round(Object.keys(stats["otherDamage"]).map(element => {
    return stats["otherDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0));

  const hitCount = Math.round(stats["hitCount"]);
  const debuffs = Math.round(stats["debuffsInflictedCount"]);

  const dotDamage = Math.round(stats["dotDamage"]);

  const totalDamage = totalNormalAttackDamage +
    totalChargedAttackDamage +
    totalSkillDamage +
    totalOtherDamage +
    dotDamage;

  return (
    <div className={character ? "stats-list for-character" : "stats-list"}>
      {character ?
        <>
          <Avatar key={character["characterId"]} characterData={character} />
        </> :
        <></>
      }
      <div className="stats-container">
        {header ?
          <div className="stats-header">
            {header}
          </div> :
          <></>
        }
        <div className="stat-line"><span className="stat-label">Total damage:</span> <span className="stat-value">{totalDamage.toLocaleString()}</span></div>
        <div className="stat-line"><span className="stat-label">NA damage:</span> <span className="stat-value">{totalNormalAttackDamage.toLocaleString()}</span></div>
        <div className="stat-line"><span className="stat-label">CA damage:</span> <span className="stat-value">{totalChargedAttackDamage.toLocaleString()}</span></div>
        <div className="stat-line"><span className="stat-label">Skill damage:</span> <span className="stat-value">{totalSkillDamage.toLocaleString()}</span></div>
        <div className="stat-line"><span className="stat-label">Other damage:</span> <span className="stat-value">{totalOtherDamage.toLocaleString()}</span></div>
        <div className="stat-line"><span className="stat-label">Hit count:</span> <span className="stat-value">{hitCount}</span></div>
        <div className="stat-line"><span className="stat-label">Debuffs:</span> <span className="stat-value">{debuffs}</span></div>
      </div>
    </div>
  );
}