import { BattleAction } from "../../godsight/battletypes/battleaction";
import { TurnData } from "../../godsight/battletypes/turndata";

export default function Action({ action }: { action: BattleAction }) {
  const subactions = action.getSubactions();

  return (
    <>
      <div className="action-description">${action.getDescription()}</div>
      {subactions.map(a =>
        <div className="subaction-description">${a.getDescription()}</div>
      )}
    </>
  );
}