import { GameElementHelper } from '../../gbf/battletypes/scenariodata/mechanics/element';
import { GodsightPartyMemberData } from '../../godsight/battletypes/partyformationdata';
import { useGodsightSettings } from '../../godsight/settings/usegodsightsettings';

export default function Avatar({
  characterData,
  backline,
  showName,
}: {
  characterData: GodsightPartyMemberData;
  backline?: boolean;
  showName?: boolean;
}) {
  const settings = useGodsightSettings();

  const avatarUrl = function (avatarId: string, isMC: boolean) {
    if (isMC) {
      return `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/leader/raid_normal/${avatarId}.jpg`;
    } else {
      return `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/raid_normal/${avatarId}.jpg`;
    }
  };

  const elementName = GameElementHelper.getPrettyElementName(
    characterData['element'],
  );

  return (
    <div
      className={
        backline || !characterData['alive']
          ? 'avatar-container backline-or-dead'
          : 'avatar-container'
      }
    >
      {settings['enableImageLoading'] ? (
        <>
          <img
            className="portrait"
            src={avatarUrl(
              characterData['portraitImageId'],
              characterData['isMC'],
            )}
          />
          <div
            className={`element-icon icon-attribute-${characterData['element']}`}
          />
          <div className="mask" />
          {!characterData['alive'] ? (
            <div className="death-icon">💀</div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <div className="portrait-noimage">
            {showName ? (
              <div className="character-name">{characterData['name']}</div>
            ) : (
              <></>
            )}
          </div>
          <div
            className={`element-icon-noimage element ${elementName}`}
            title={elementName}
          >
            ⬤
          </div>
          <div className="mask" />
          {!characterData['alive'] ? (
            <div className="death-icon">💀</div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
