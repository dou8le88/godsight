import { useRef } from "react";
import { SettingsManager } from "../../godsight/settings/settingsmanager";
import { useGodsightSettings } from "../../godsight/settings/usegodsightsettings";
import { DefaultBattleView } from "../../godsight/settings/godsightsettings";

export function Config({ onExit }: { onExit: () => void }) {
  const settingsManager = SettingsManager.getInstance();
  const settings = useGodsightSettings();

  const mainCharacterNameRef = useRef<HTMLInputElement>(null);

  const defaultBattleViewOptions = Object.values(DefaultBattleView);
  const defaultBattleViewRef = useRef<HTMLSelectElement>(null);

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
            <label htmlFor="main-character-name-override" className="config-description">
              Override MC name (leave blank to use ingame name):
            </label>
            <input
              id="main-character-name-override"
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
          <div className="config-option">
            <label htmlFor="default-battle-view" className="config-description">
              Default battle view:
            </label>
            <select
              id="default-battle-view"
              className="config-select-input"
              name="default-battle-view"
              ref={defaultBattleViewRef}
              defaultValue={settings["defaultBattleView"]}
              onChange={() => {
                if (defaultBattleViewRef.current) {
                  settingsManager.updateSingleSetting(
                    "defaultBattleView",
                    defaultBattleViewRef.current.value as DefaultBattleView,
                  );
                }
              }}
            >
              {defaultBattleViewOptions.map(viewOption => (
                <option
                  key={viewOption}
                  value={viewOption}
                >
                  {viewOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}