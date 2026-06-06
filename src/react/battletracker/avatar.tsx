import { GodsightPartyMemberData } from "../../godsight/battletypes/partyformationdata";

export default function Avatar({ characterData }: { characterData: GodsightPartyMemberData }) {

  const avatarUrl = function (avatarId: string, isMC: boolean) {
    if (isMC) {
      return `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/leader/raid_normal/${avatarId}.jpg`;
    } else {
      return `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/raid_normal/${avatarId}.jpg`;
    }
  }

  return (
    <div className="avatar-wrapper">
      <img className="portrait" src={avatarUrl(characterData.portraitImageId, characterData.isMC)} />
      <div className={`element-icon icon-attribute-${characterData.element}`} />
      <div className="mask" />
    </div>
  );
}