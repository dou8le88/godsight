import { useEffect, useRef } from 'react';
import { SettingsManager } from '../../godsight/settings/settingsmanager';
import { useGodsightSettings } from '../../godsight/settings/usegodsightsettings';
import {
  DamageDisplay,
  DefaultBattleView,
  OnRaidLoadBehavior,
} from '../../godsight/settings/godsightsettings';
import { DamageInstance } from '../../godsight/battletypes/damageinstance';
import { GameElement } from '../../gbf/battletypes/scenariodata/mechanics/element';
import { BattleActionHelper } from '../../godsight/battletypes/battleactionhelper';

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
  const sampleDamageInstances: DamageInstance[] = [
    {
      'element': GameElement.NULL_PLAIN,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.NULL_PLAIN,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.FIRE,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.FIRE,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.WATER,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.WATER,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.EARTH,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.EARTH,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.WIND,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.WIND,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.LIGHT,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.LIGHT,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.DARK,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.DARK,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.DESTRUCTION,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
    {
      'element': GameElement.DESTRUCTION,
      'receiverName': 'Old Lignoid',
      'receiverIndex': 0,
      'value': 1000000,
      'critical': true,
      'miss': 0,
      'guarded': false,
    },
  ];

  const onRaidLoadOptions = Object.values(OnRaidLoadBehavior);
  const onRaidLoadRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key == 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();

        onExit();
      }
    };
    window.addEventListener('keydown', listener, true);

    return () => {
      window.removeEventListener('keydown', listener, true);
    };
  }, []);

  return (
    <>
      <div className="config-overlay-mask"></div>
      <div className="config-window">
        <div className="config-header">
          <div>Configuration</div>
          <div
            className="exit-icon"
            onClick={() => onExit()}
          >
            X
          </div>
        </div>
        <table className="config-body">
          <tbody>
            <tr className="config-option">
              <td className="config-description">Override MC name:</td>
              <td className="config-input-container">
                <input
                  id="main-character-name-override"
                  className="config-text-input"
                  type="text"
                  placeholder="Same as ingame name"
                  ref={mainCharacterNameRef}
                  defaultValue={settings['mainCharacterNameOverride']}
                  onBlur={() => {
                    if (mainCharacterNameRef.current) {
                      settingsManager.updateSingleSetting(
                        'mainCharacterNameOverride',
                        mainCharacterNameRef.current.value,
                      );
                    }
                  }}
                />
              </td>
              <td className="config-explanation">
                Leave blank to use your ingame name. Existing actions in
                recorded battles will not be updated.
              </td>
            </tr>
            <tr className="config-option">
              <td className="config-description">Default battle view:</td>
              <td className="config-input-container">
                <select
                  id="default-battle-view"
                  className="config-select-input"
                  name="default-battle-view"
                  ref={defaultBattleViewRef}
                  defaultValue={settings['defaultBattleView']}
                  onChange={() => {
                    if (defaultBattleViewRef.current) {
                      settingsManager.updateSingleSetting(
                        'defaultBattleView',
                        defaultBattleViewRef.current.value as DefaultBattleView,
                      );
                    }
                  }}
                >
                  {defaultBattleViewOptions.map((viewOption) => (
                    <option
                      key={viewOption}
                      value={viewOption}
                    >
                      {viewOption}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr className="config-option">
              <td className="config-description">Max remembered battles:</td>
              <td className="config-input-container">
                <input
                  id="max-remembered-battles"
                  className="config-text-input"
                  type="number"
                  defaultValue={settings['maxRememberedBattles']}
                  ref={maxRememberedBattlesRef}
                  onBlur={() => {
                    if (maxRememberedBattlesRef.current) {
                      const value = Number(
                        maxRememberedBattlesRef.current.value,
                      );

                      if (!isNaN(value)) {
                        if (value >= minRememberedBattles) {
                          settingsManager.updateSingleSetting(
                            'maxRememberedBattles',
                            value,
                          );
                        } else {
                          maxRememberedBattlesRef.current.value = `${minRememberedBattles}`;
                          settingsManager.updateSingleSetting(
                            'maxRememberedBattles',
                            minRememberedBattles,
                          );
                        }
                      }
                    }
                  }}
                />
              </td>
              <td className="config-explanation">
                Minimum 5. Changes to this value take effect the next time
                battle data is recorded.
              </td>
            </tr>
            <tr className="config-option">
              <td className="config-description">Multi-hit damage display:</td>
              <td className="config-input-container">
                <select
                  id="damage-display"
                  className="config-select-input"
                  name="damage-display"
                  ref={damageDisplayRef}
                  defaultValue={settings['damageDisplay']}
                  onChange={() => {
                    if (damageDisplayRef.current) {
                      settingsManager.updateSingleSetting(
                        'damageDisplay',
                        damageDisplayRef.current.value as DamageDisplay,
                      );
                    }
                  }}
                >
                  {damageDisplayOptions.map((viewOption) => (
                    <option
                      key={viewOption}
                      value={viewOption}
                    >
                      {viewOption}
                    </option>
                  ))}
                </select>
              </td>
              <td className="config-explanation">
                {BattleActionHelper.getDamageInstanceJsx(
                  sampleDamageInstances,
                  settings['damageDisplay'],
                )}
              </td>
            </tr>
            <tr className="config-option">
              <td className="config-description">
                Behavior on loading into a raid:
              </td>
              <td className="config-input-container">
                <select
                  id="on-raid-load"
                  className="config-select-input"
                  name="on-raid-load"
                  ref={onRaidLoadRef}
                  defaultValue={settings['onRaidLoadBehavior']}
                  onChange={() => {
                    if (onRaidLoadRef.current) {
                      settingsManager.updateSingleSetting(
                        'onRaidLoadBehavior',
                        onRaidLoadRef.current.value as OnRaidLoadBehavior,
                      );
                    }
                  }}
                >
                  {onRaidLoadOptions.map((viewOption) => (
                    <option
                      key={viewOption}
                      value={viewOption}
                    >
                      {viewOption}
                    </option>
                  ))}
                </select>
              </td>
              <td className="config-explanation">
                Switch to Raid - Immediately change the inspected battle to the
                newly-loaded battle.
                <br />
                Notify - Show an in-panel notification with a clickable button
                to inspect the battle.
                <br />
                No Action - do nothing when loading into a raid.
              </td>
            </tr>
            <tr className="config-option">
              <td className="config-description">
                Enable loading images from the GBF CDN:
              </td>
              <td className="config-input-container">
                <input
                  type="checkbox"
                  className="config-checkbox"
                  checked={settings['enableImageLoading']}
                  onChange={(e) => {
                    settingsManager.updateSingleSetting(
                      'enableImageLoading',
                      e.target.checked,
                    );
                  }}
                />
              </td>
              <td className="config-explanation">
                Enables loading of party member portraits and status effect
                icons from the GBF CDN.
                <br />
                As your browser must load this data anyway to display the images
                ingame, these requests are cached and should have minimal impact
                on the game servers.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
