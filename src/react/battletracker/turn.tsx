import { GodsightBattleData } from "../../godsight/battletypes/battledata";
import { TurnData } from "../../godsight/battletypes/turndata";
import Action from "./action";

export default function Turn({ turnData, turnNumber }: { turnData: TurnData, turnNumber: number }) {
  const turnStats = turnData["turnStats"];

  const totalNormalAttackDamage = Object.keys(turnStats["normalAttackDamage"]).map(element => {
    return turnStats["normalAttackDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0);

  const totalChargedAttackDamage = Object.keys(turnStats["chargedAttackDamage"]).map(element => {
    return turnStats["chargedAttackDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0);

  const totalSkillDamage = Object.keys(turnStats["skillDamage"]).map(element => {
    return turnStats["skillDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0);

  const totalOtherDamage = Object.keys(turnStats["otherDamage"]).map(element => {
    return turnStats["otherDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0);

  const hitCount = turnStats["hitCount"];
  const debuffs = turnStats["debuffsInflictedCount"];

  const totalDamage = totalNormalAttackDamage + totalChargedAttackDamage + totalSkillDamage + totalOtherDamage;

  return (
    <details className="turn" open={true}>
      <summary className="turn-counter">Turn {turnNumber}</summary>

      <div className="turn-action-container">
        {turnData["turnActions"].map(action =>
          <Action key={action.actionNumber} action={action} />
        )}
      </div>
      <div className="turn-stats">
        <div className="stat-container"><span className="stat-label">Turn damage:</span> <span className="stat-value">{totalDamage.toLocaleString()}</span></div>
        <div className="stat-container"><span className="stat-label">NA damage:</span> <span className="stat-value">{totalNormalAttackDamage.toLocaleString()}</span></div>
        <div className="stat-container"><span className="stat-label">CA damage:</span> <span className="stat-value">{totalChargedAttackDamage.toLocaleString()}</span></div>
        <div className="stat-container"><span className="stat-label">Skill damage:</span> <span className="stat-value">{totalSkillDamage.toLocaleString()}</span></div>
        <div className="stat-container"><span className="stat-label">Other damage:</span> <span className="stat-value">{totalOtherDamage.toLocaleString()}</span></div>
        <div className="stat-container"><span className="stat-label">Hit count:</span> <span className="stat-value">{hitCount}</span></div>
        <div className="stat-container"><span className="stat-label">Debuffs:</span> <span className="stat-value">{debuffs}</span></div>
      </div>
    </details>
  );
}