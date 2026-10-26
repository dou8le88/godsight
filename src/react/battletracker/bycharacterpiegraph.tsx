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
  TooltipContentProps,
} from 'recharts';
import { GodsightBattleData } from '../../godsight/battletypes/battledata';
import { Stats, StatsUpdateHelper } from '../../godsight/battletypes/stats';
import { CSSProperties } from 'react';
import { CharacterColors } from './charactercolors';

const tooltipStyle: CSSProperties = {
  backgroundColor: '#282828',
  color: '#B4D3E0',
};

interface ByCharacterGraphData {
  name: string;
  damage: number;
  hitCount: number;
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
    const totals = StatsUpdateHelper.getTotalDamage(stats);

    const hitCount = stats['hitCount'];

    return {
      name: charName,
      damage: totals.totalDamage,
      hitCount: hitCount,
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

  const CustomTooltip = ({
    active,
    payload,
    activeIndex,
  }: TooltipContentProps) => {
    if (active && payload && payload.length) {
      const numericIndex = Number(activeIndex);

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: '#282828',
            padding: '10px',
            border: '1px solid #c2c2c2',
          }}
        >
          {payload.map((entry, index) =>
            entry.value !== 0 && entry.value != null ? (
              <p
                key={`item-${index}`}
                style={{ color: CharacterColors[numericIndex] }}
              >
                {entry.name}: {entry.value?.toLocaleString()} (
                {((Number(entry.value) / totalDamage) * 100).toFixed(0)}%) (
                {data[numericIndex]['hitCount']} hits)
              </p>
            ) : (
              <span key={`item-${index}`}></span>
            ),
          )}
        </div>
      );
    }

    return null;
  };

  const customLabel = (props: PieLabelRenderProps) => {
    if (props.percent !== undefined && props.percent < 0.02) {
      return null;
    }
    let hitsText = '';
    const character = data.find((charStat) => charStat.name == props.name);
    if (character) {
      hitsText = ` (${character['hitCount']} hits)`;
    }
    const percent = ((props.value / totalDamage) * 100).toFixed(0);
    return `${props.value.toLocaleString()} (${percent}%)${hitsText}`;
  };

  return (
    <div className="battle-stats-deepdive">
      <PieChart
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '600px',
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
          content={CustomTooltip}
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
