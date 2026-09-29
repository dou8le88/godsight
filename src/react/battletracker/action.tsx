import { BattleAction } from "../../godsight/battletypes/battleaction";
import { useGodsightSettings } from "../../godsight/settings/usegodsightsettings";
import React from "react";

function Action({ action, idx }: { action: BattleAction, idx: number }) {
  const settings = useGodsightSettings();

  return (
    <div className="action-container">
      {action.getDescription(idx, settings["damageDisplay"])}
    </div>
  );
}

export default React.memo(Action);