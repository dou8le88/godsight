import { GodsightPartyMemberData } from '../../godsight/battletypes/partyformationdata';

export default function Avatar({
  characterData,
  backline,
}: {
  characterData: GodsightPartyMemberData;
  backline?: boolean;
}) {
  const avatarUrl = function (avatarId: string, isMC: boolean) {
    if (isMC) {
      return `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/leader/raid_normal/${avatarId}.jpg`;
    } else {
      return `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/raid_normal/${avatarId}.jpg`;
    }
  };

  return (
    <div
      className={
        backline || !characterData['alive']
          ? 'avatar-container backline-or-dead'
          : 'avatar-container'
      }
    >
      <img
        className="portrait"
        src={avatarUrl(characterData['portraitImageId'], characterData['isMC'])}
      />
      <div
        className={`element-icon icon-attribute-${characterData['element']}`}
      />
      <div className="mask" />
    </div>
  );
}
