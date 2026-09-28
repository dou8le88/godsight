import { useRef } from "react";
import { SettingsManager } from "../../godsight/settings/settingsmanager";
import { useGodsightSettings } from "../../godsight/settings/usegodsightsettings";

export function Config({ onExit }: { onExit: () => void }) {
  const settingsManager = SettingsManager.getInstance();
  const settings = useGodsightSettings();

  const mainCharacterNameRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="config-overlay-mask"></div>
      <div className="config-window">
        <div className="config-header">
          <div>
            Configuration
          </div>
          <div className="exit-icon" onClick={() => onExit()}>
            X
          </div>
        </div>
        <div className="config-body">
          <div className="config-option">
            <label className="config-description">
              Override MC name (leave blank to use ingame name):
            </label>
            <input
              className="config-text-input"
              type="text"
              placeholder="Same as ingame name"
              ref={mainCharacterNameRef}
              value={settings["mainCharacterNameOverride"]}
              onChange={() => {
                if (mainCharacterNameRef.current) {
                  settingsManager.updateSingleSetting(
                    "mainCharacterNameOverride",
                    mainCharacterNameRef.current.value
                  );
                }
              }} />
          </div>
        </div>
      </div>
    </>
  );
}