import { BattleAction } from "../../godsight/battletypes/battleaction";
import { TurnData } from "../../godsight/battletypes/turndata";

export default function Action({ action }: { action: BattleAction }) {
  const subactions = action.subactions;

  return (
    <div className="action-container">
      <div className="action-description">{action.getDescription()}</div>
      {subactions.map(a =>
        <div key={a.actionNumber} className="subaction-description">{a.getDescription()}</div>
      )}
    </div>
  );
}