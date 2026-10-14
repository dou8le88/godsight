import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  PieSectorShapeProps,
  Sector,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
  PieLabelRenderProps,
} from 'recharts';
import { GodsightBattleData } from '../../godsight/battletypes/battledata';
import { Stats } from '../../godsight/battletypes/stats';
import { CSSProperties } from 'react';
import { CharacterColors } from './charactercolors';

const tooltipStyle: CSSProperties = {
  backgroundColor: '#282828',
  color: '#B4D3E0',
};

interface ByCharacterGraphData {
  name: string;
  damage: number;
  fill: string;
}

function byCharacterBreakdown(
  battleData: GodsightBattleData,
  characterStats: Record<string | number, Stats>,
) {
  const allCharacters = Object.keys(characterStats)
    .map((c) => Number(c))
    .sort((a, b) => a - b);

  const data: ByCharacterGraphData[] = allCharacters.map((charIdx) => {
    const stats = characterStats[charIdx];
    const charName = battleData['party']['members'][Number(charIdx)]['name'];

    const totalNormalAttackDamage = Math.round(
      Object.keys(stats['normalAttackDamage'])
        .map((element) => {
          return stats['normalAttackDamage'][element];
        })
        .reduce((prev, cur) => prev + cur, 0),
    );

    const totalChargedAttackDamage = Math.round(
      Object.keys(stats['chargedAttackDamage'])
        .map((element) => {
          return stats['chargedAttackDamage'][element];
        })
        .reduce((prev, cur) => prev + cur, 0),
    );

    const totalSkillDamage = Math.round(
      Object.keys(stats['skillDamage'])
        .map((element) => {
          return stats['skillDamage'][element];
        })
        .reduce((prev, cur) => prev + cur, 0),
    );

    const totalOtherDamage = Math.round(
      Object.keys(stats['otherDamage'])
        .map((element) => {
          return stats['otherDamage'][element];
        })
        .reduce((prev, cur) => prev + cur, 0),
    );

    const totalDamage =
      totalNormalAttackDamage +
      totalChargedAttackDamage +
      totalSkillDamage +
      totalOtherDamage +
      stats['dotDamage'];

    return {
      name: charName,
      damage: totalDamage,
      fill: CharacterColors[charIdx],
    };
  });

  const totalDamage =
    data.reduce<number>((acc, cur) => acc + cur.damage, 0) || 1;

  const CustomSectors = (props: PieSectorShapeProps) => {
    const p = useActiveTooltipDataPoints();
    const isAnyPieActive = useIsTooltipActive();
    const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
    let fillOpacity: number;
    if (isAnyPieActive && !isThisPieActive) {
      fillOpacity = 0.5;
    } else {
      fillOpacity = 1;
    }

    if (props.value == 0) return null;

    return (
      <Sector
        {...props}
        stroke="none"
        fill={CharacterColors[props.index % CharacterColors.length]}
        fillOpacity={fillOpacity}
        style={{ transition: 'fill-opacity 0.3s ease' }}
      />
    );
  };

  const customLabel = (props: PieLabelRenderProps) => {
    if (props.percent !== undefined && props.percent < 0.02) {
      return null;
    }
    const percent = ((props.value / totalDamage) * 100).toFixed(0);
    return `${props.value.toLocaleString()} (${percent}%)`;
  };

  return (
    <div className="battle-stats-deepdive">
      <PieChart
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '500px',
          maxHeight: '500px',
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={data}
          dataKey="damage"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="50%"
          shape={CustomSectors}
          label={customLabel}
          labelLine={false}
          minAngle={2}
        ></Pie>
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(a) =>
            `${a?.toLocaleString()} (${((Number(a) / totalDamage) * 100).toFixed(0)}%)`
          }
        />
        <Legend
          iconType="circle"
          itemSorter={null}
        />
      </PieChart>
    </div>
  );
}

export function ByCharacterPieGraph({
  battleData,
  characterStats,
}: {
  battleData: GodsightBattleData;
  characterStats: Record<string | number, Stats>;
}) {
  if (Object.keys(characterStats).length == 0) {
    return <>No data available.</>;
  } else {
    return byCharacterBreakdown(battleData, characterStats);
  }
}
