// import { ExtensionLanguage } from '../../godsight/settings/godsightsettings';
// import { SettingsManager } from '../../godsight/settings/settingsmanager';
import { useGodsightSettings } from '../../godsight/settings/usegodsightsettings';

export function Toolbar({
  onConfigClicked,
  onMakeTestFileClicked,
  makeTestFileEnabled,
}: {
  onConfigClicked: () => void;
  onMakeTestFileClicked: () => void;
  makeTestFileEnabled: boolean;
}) {
  const settings = useGodsightSettings();
  // const settingsManager = SettingsManager.getInstance();

  // TODO: JP translation for extension UI + this config to change it.
  return (
    <div className="toolbar">
      {settings['devMode'] && settings['downloadBattleData'] ? (
        <button
          className="save-batch-test-file"
          disabled={!makeTestFileEnabled}
          title={
            makeTestFileEnabled
              ? 'Make a test file for the downloaded battle data. It will be saved to the same folder as the test data.'
              : 'No downloaded battle data to make a test file from.'
          }
          onClick={() => onMakeTestFileClicked()}
        >
          Make Test for Downloaded Files
        </button>
      ) : (
        <></>
      )}
      {/* <div className="language-config">
        <span
          className={
            settings['extensionLanguage'] == ExtensionLanguage.EN
              ? 'language-option language-en selected'
              : 'language-option language-en'
          }
          onClick={() => {
            if (settings['extensionLanguage'] != ExtensionLanguage.EN) {
              settingsManager.updateSingleSetting(
                'extensionLanguage',
                ExtensionLanguage.EN,
              );
            }
          }}
        >
          EN
        </span>{' '}
        |{' '}
        <span
          className={
            settings['extensionLanguage'] == ExtensionLanguage.JA
              ? 'language-option language-jp selected'
              : 'language-option language-jp'
          }
          onClick={() => {
            if (settings['extensionLanguage'] != ExtensionLanguage.JA) {
              settingsManager.updateSingleSetting(
                'extensionLanguage',
                ExtensionLanguage.JA,
              );
            }
          }}
        >
          日
        </span>
      </div> */}
      <div
        className="icon config-icon"
        onClick={() => onConfigClicked()}
      >
        ⚙
      </div>
    </div>
  );
}
