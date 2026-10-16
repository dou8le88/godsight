import { GodsightBattleData } from '../../godsight/battletypes/battledata';

export default function BattleSummary({
  battleData,
  onClick,
  deleteEntry,
}: {
  battleData: GodsightBattleData;
  onClick: () => void;
  deleteEntry: () => void;
}) {
  const updateTime = new Date(battleData['lastUpdated']);

  const prettyUpdateTime = `${updateTime.toLocaleDateString()} ${updateTime.toLocaleTimeString()}`;
  const waveCount =
    battleData['totalWaves'] > 1
      ? ` (${battleData['currentWave']}/${battleData['totalWaves']})`
      : '';

  return (
    <div
      className="battle-summary-container"
      onClick={onClick}
    >
      <div className="versus">
        Vs. {battleData['boss'][0]['name']}
        {waveCount}
      </div>
      <div className="last-updated">Last updated: {prettyUpdateTime}</div>
      <div
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          deleteEntry();
        }}
      >
        Delete
      </div>
    </div>
  );
}
