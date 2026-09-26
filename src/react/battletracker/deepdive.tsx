
import { PieSectorShapeProps, useActiveTooltipDataPoints, useIsTooltipActive, Sector, PieChart, Pie, Legend, PieLabelRenderProps } from "recharts";
import { Stats } from "../../godsight/battletypes/stats";
import { Breakdown } from "./breakdown";
import { GameElement, GameElementHelper, GameElementValue, NumericGameElement } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { identity } from "../../util/functional";

function byTypeBreakdown(stats: Stats) {
  const totalNormalAttackDamage = Math.round(Object.keys(stats["normalAttackDamage"]).map(element => {
    return stats["normalAttackDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0));

  const totalChargedAttackDamage = Math.round(Object.keys(stats["chargedAttackDamage"]).map(element => {
    return stats["chargedAttackDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0));

  const totalSkillDamage = Math.round(Object.keys(stats["skillDamage"]).map(element => {
    return stats["skillDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0));

  const totalOtherDamage = Math.round(Object.keys(stats["otherDamage"]).map(element => {
    return stats["otherDamage"][element];
  }).reduce((prev, cur) => prev + cur, 0));

  const totalDamage = (totalNormalAttackDamage +
    totalChargedAttackDamage +
    totalSkillDamage +
    totalOtherDamage +
    stats["dotDamage"]) || 1;

  function getDamageByTypePieChartData(): [{ name: string, value: number, fill: string }[], string[]] {
    const damageTypeSectorColors: string[] = [];

    const data: {
      name: string;
      value: number;
      fill: string;
    }[] = [];

    if (totalNormalAttackDamage > 0) {
      data.push({
        name: "NA",
        value: totalNormalAttackDamage,
        fill: '#EC4266',
      });
      damageTypeSectorColors.push("#EC4266");
    }
    if (totalChargedAttackDamage > 0) {
      data.push({
        name: "CA",
        value: totalChargedAttackDamage,
        fill: '#FCD671',
      });
      damageTypeSectorColors.push("#FCD671");
    }
    if (totalSkillDamage > 0) {
      data.push({
        name: "Skill",
        value: totalSkillDamage,
        fill: '#2388B6',
      });
      damageTypeSectorColors.push("#2388B6");
    }
    if (totalOtherDamage > 0) {
      data.push({
        name: "Other",
        value: totalOtherDamage,
        fill: '#B3B3B3',
      });
      damageTypeSectorColors.push("#B3B3B3");
    }

    return [data, damageTypeSectorColors];
  }

  const [data, colors] = getDamageByTypePieChartData();

  const CustomColors = (props: PieSectorShapeProps) => {
    const p = useActiveTooltipDataPoints();
    const isAnyPieActive = useIsTooltipActive();
    const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
    let fillOpacity: number;
    if (isAnyPieActive && !isThisPieActive) {
      fillOpacity = 0.5;
    } else {
      fillOpacity = 1;
    }
    return (
      <Sector
        {...props}
        fill={colors[props.index % colors.length]}
        stroke="none"
        fillOpacity={fillOpacity}
        style={{ transition: 'fill-opacity 0.3s ease' }}
      />
    );
  };

  const customLabel = (props: PieLabelRenderProps) => {
    const percent = ((props.value / totalDamage) * 100).toFixed(0);
    return `${props.value.toLocaleString()} (${percent}%)`;
  };

  return (
    <>
      <div className="battle-stats-deepdive">
        <PieChart
          style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px', aspectRatio: 1 }}
          responsive
        >
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="50%"
            shape={CustomColors}
            label={customLabel}
            labelLine={false}
          >
          </Pie>
          <Legend iconType="circle" />
        </PieChart>
      </div>
    </>
  );
}

function byElementBreakdown(stats: Stats) {
  const allElements = GameElementHelper.getAllElements();
  const elementTotals: Record<NumericGameElement, number> = {} as Record<NumericGameElement, number>;

  allElements.forEach(elt => {
    elementTotals[elt] = 0;
  });

  allElements.forEach(elt => {
    elementTotals[elt] += stats["normalAttackDamage"][elt];
    elementTotals[elt] += stats["chargedAttackDamage"][elt];
    elementTotals[elt] += stats["skillDamage"][elt];
    elementTotals[elt] += stats["otherDamage"][elt];
    if (elt == GameElement.NULL_PLAIN) {
      elementTotals[elt] += stats["dotDamage"];
    }
  });

  const totalDamage = allElements.reduce<number>((prev, cur) => {
    return prev + elementTotals[cur];
  }, 0) || 1;

  function getDamageByElementPieChartData(): [{ name: string, value: number, fill: string }[], string[]] {
    const damageElementSectorColors: string[] = [];

    const data: {
      name: string;
      value: number;
      fill: string;
    }[] = [];

    allElements.forEach(elt => {
      if (elementTotals[elt] > 0) {
        const color = GameElementHelper.getElementColor(elt);
        data.push({
          name: GameElementHelper.getPrettyElementName(elt),
          value: elementTotals[elt],
          fill: color,
        });
        damageElementSectorColors.push(color);
      }
    });

    return [data, damageElementSectorColors];
  }

  const [data, colors] = getDamageByElementPieChartData();

  const CustomColors = (props: PieSectorShapeProps) => {
    const p = useActiveTooltipDataPoints();
    const isAnyPieActive = useIsTooltipActive();
    const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
    let fillOpacity: number;
    if (isAnyPieActive && !isThisPieActive) {
      fillOpacity = 0.5;
    } else {
      fillOpacity = 1;
    }
    return (
      <Sector
        {...props}
        fill={colors[props.index % colors.length]}
        stroke="none"
        fillOpacity={fillOpacity}
        style={{ transition: 'fill-opacity 0.3s ease' }}
      />
    );
  };

  const customLabel = (props: PieLabelRenderProps) => {
    const percent = ((props.value / totalDamage) * 100).toFixed(0);
    return `${props.value.toLocaleString()} (${percent}%)`;
  };

  return (
    <>
      <div className="battle-stats-deepdive">
        <PieChart
          style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px', aspectRatio: 1 }}
          responsive
        >
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="50%"
            shape={CustomColors}
            label={customLabel}
            labelLine={false}
          >
          </Pie>
          <Legend iconType="circle" />
        </PieChart>
      </div>
    </>
  );
}

export function DeepDivePieGraph({ stats, breakdown }: { stats: Stats, breakdown: Breakdown }) {
  switch (breakdown) {
    case Breakdown.BY_TYPE:
      return byTypeBreakdown(stats);
    case Breakdown.BY_ELEMENT:
      return byElementBreakdown(stats);
    case Breakdown.BY_TURN:
      return <>Turn breakdown not supported for this view.</>
  }
}