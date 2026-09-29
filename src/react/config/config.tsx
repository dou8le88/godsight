import { useEffect, useRef } from "react";
import { SettingsManager } from "../../godsight/settings/settingsmanager";
import { useGodsightSettings } from "../../godsight/settings/usegodsightsettings";
import { DamageDisplay, DefaultBattleView } from "../../godsight/settings/godsightsettings";
import { DamageInstance } from "../../godsight/battletypes/damageinstance";
import { GameElement } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { BattleActionHelper } from "../../godsight/battletypes/battleactionhelper";

export function Config({ onExit }: { onExit: () => void }) {
  const settingsManager = SettingsManager.getInstance();
  const settings = useGodsightSettings();

  const mainCharacterNameRef = useRef<HTMLInputElement>(null);

  const defaultBattleViewOptions = Object.values(DefaultBattleView);
  const defaultBattleViewRef = useRef<HTMLSelectElement>(null);

  const maxRememberedBattlesRef = useRef<HTMLInputElement>(null);
  const minRememberedBattles = 5;

  const damageDisplayOptions = Object.values(DamageDisplay);
  const damageDisplayRef = useRef<HTMLSelectElement>(null);
  const sampleDamageInstances: DamageInstance[] = [{
    "element": GameElement.NULL_PLAIN,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.NULL_PLAIN,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.FIRE,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.FIRE,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.WATER,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.WATER,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.EARTH,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.EARTH,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.WIND,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.WIND,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.LIGHT,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.LIGHT,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.DARK,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.DARK,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.DESTRUCTION,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }, {
    "element": GameElement.DESTRUCTION,
    "receiverName": "Old Lignoid",
    "receiverIndex": 0,
    "value": 1000000,
    "critical": true,
    "miss": 0,
    "guarded": false,
  }];

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();

        onExit();
      }
    };
    window.addEventListener("keydown", listener, true);

    return () => {
      window.removeEventListener("keydown", listener, true);
    };
  }, []);

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
          <div className="config-option">
            <label htmlFor="max-remembered-battles" className="config-description">
              Max remembered battles:
            </label>
            <input
              id="max-remembered-battles"
              className="config-text-input"
              type="number"
              value={settings["maxRememberedBattles"]}
              min={minRememberedBattles}
              ref={maxRememberedBattlesRef}
              onChange={() => {
                if (maxRememberedBattlesRef.current) {
                  const value = Number(maxRememberedBattlesRef.current.value);

                  if (!isNaN(value) && value >= minRememberedBattles) {
                    settingsManager.updateSingleSetting(
                      "maxRememberedBattles",
                      value,
                    );
                  }
                }
              }}
            />
          </div>
          <div className="config-option">
            <label htmlFor="damage-display" className="config-description">
              Multi-hit damage display:
            </label>
            <select
              id="damage-display"
              className="config-select-input"
              name="damage-display"
              ref={damageDisplayRef}
              defaultValue={settings["damageDisplay"]}
              onChange={() => {
                if (damageDisplayRef.current) {
                  settingsManager.updateSingleSetting(
                    "damageDisplay",
                    damageDisplayRef.current.value as DamageDisplay,
                  );
                }
              }}
            >
              {damageDisplayOptions.map(viewOption => (
                <option
                  key={viewOption}
                  value={viewOption}
                >
                  {viewOption}
                </option>
              ))}
            </select>
            <div className="config-explanation">
              {BattleActionHelper.getDamageInstanceJsx(sampleDamageInstances, settings["damageDisplay"])}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}