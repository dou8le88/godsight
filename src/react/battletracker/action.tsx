import { BattleAction } from "../../godsight/battletypes/battleaction";
import React from "react";

function Action({ action, idx }: { action: BattleAction, idx: number }) {
  return (
    <div className="action-container">
      {action.getDescription(idx)}
    </div>
  );
}

export default React.memo(Action);