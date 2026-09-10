import { BattleAction } from "../../godsight/battletypes/battleaction";
import React from "react";

function Action({ action }: { action: BattleAction }) {
  return (
    <div className="action-container">
      {action.getDescription()}
    </div>
  );
}

export default React.memo(Action);