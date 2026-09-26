import { GodsightBattleData } from "../../godsight/battletypes/battledata";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, createHorizontalChart, TooltipContentProps } from 'recharts';
import { StatsView } from "./statsview";
import { DamageTypeColors } from "./damagetypecolors";
import { useState } from "react";
import { Breakdown } from "./breakdown";
import { GameElement, GameElementHelper } from "../../gbf/battletypes/scenariodata/mechanics/element";

interface ByTypeChartData {
  turn: string,
  normalAttackDamage: number,
  skillDamage: number,
  chargedAttackDamage: number,
  otherDamage: number,
}

interface ByElementChartData {
  turn: string,
  [GameElement.NULL_PLAIN]: number,
  [GameElement.FIRE]: number,
  [GameElement.WATER]: number,
  [GameElement.EARTH]: number,
  [GameElement.WIND]: number,
  [GameElement.LIGHT]: number,
  [GameElement.DARK]: number,
  [GameElement.DESTRUCTION]: number,
}

const ByType = createHorizontalChart<ByTypeChartData, string, number>()({
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
});

const ByElement = createHorizontalChart<ByElementChartData, string, number>()({
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
});

function totalDamageByElementTimeSeries(battleData: GodsightBattleData) {
  const allTurns = Object.keys(battleData["turnData"]).map(t => Number(t));

  const allTurnStats = allTurns.map(t => {
    return {
      turn: t,
      stats: battleData["turnData"][t]["turnStats"],
    };
  });

  const data = allTurnStats.map(statsByTurn => {
    const allElements = GameElementHelper.getAllElements();
    const elementTotals: ByElementChartData = {
      turn: `${statsByTurn.turn}`,
    } as ByElementChartData;

    allElements.forEach(elt => {
      elementTotals[elt] = 0;
    });

    allElements.forEach(elt => {
      elementTotals[elt] += statsByTurn.stats["normalAttackDamage"][elt];
      elementTotals[elt] += statsByTurn.stats["chargedAttackDamage"][elt];
      elementTotals[elt] += statsByTurn.stats["skillDamage"][elt];
      elementTotals[elt] += statsByTurn.stats["otherDamage"][elt];
      if (elt == GameElement.NULL_PLAIN) {
        elementTotals[elt] += statsByTurn.stats["dotDamage"];
      }
    });

    return elementTotals;
  });

  const labelColors = GameElementHelper.getAllElements().map(elt => {
    return { [GameElementHelper.getPrettyElementName(elt)]: GameElementHelper.getElementColor(elt) };
  }).reduce((acc, cur) => {
    return { ...acc, ...cur };
  }, {});

  const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
    if (active && payload && payload.length) {
      // Filter out items with a value of 0 (and optionally null/undefined)
      const filteredPayload = payload.filter((item) => item.value !== 0 && item.value != null);

      // If everything is filtered out, render nothing
      if (filteredPayload.length === 0) return null;

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: '#282828',
            padding: '10px',
            border: "1px solid #c2c2c2"
          }}>
          <p className="label">Turn {label}</p>
          {filteredPayload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: labelColors[entry.name as keyof typeof labelColors] }}>
              {entry.name}: {entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <ByElement.BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <ByElement.XAxis dataKey="turn" niceTicks="snap125" />
      <ByElement.YAxis width="auto" niceTicks="snap125" />
      <Tooltip
        labelFormatter={(label) => `Turn ${label}`}
        formatter={(a) => a?.toLocaleString()}
        content={CustomTooltip}
      />
      <Legend itemSorter={null} />
      <ByElement.Bar
        name={GameElementHelper.getPrettyElementName(GameElement.NULL_PLAIN)}
        dataKey={GameElement.NULL_PLAIN}
        stackId="turn"
        fill={GameElementHelper.getElementColor(GameElement.NULL_PLAIN)}
      />
      <ByElement.Bar
        name={GameElementHelper.getPrettyElementName(GameElement.FIRE)}
        dataKey={GameElement.FIRE}
        stackId="turn"
        fill={GameElementHelper.getElementColor(GameElement.FIRE)}
      />
      <ByElement.Bar
        name={GameElementHelper.getPrettyElementName(GameElement.WATER)}
        dataKey={GameElement.WATER}
        stackId="turn"
        fill={GameElementHelper.getElementColor(GameElement.WATER)}
      />
      <ByElement.Bar
        name={GameElementHelper.getPrettyElementName(GameElement.EARTH)}
        dataKey={GameElement.EARTH}
        stackId="turn"
        fill={GameElementHelper.getElementColor(GameElement.EARTH)}
      />
      <ByElement.Bar
        name={GameElementHelper.getPrettyElementName(GameElement.WIND)}
        dataKey={GameElement.WIND}
        stackId="turn"
        fill={GameElementHelper.getElementColor(GameElement.WIND)}
      />
      <ByElement.Bar
        name={GameElementHelper.getPrettyElementName(GameElement.LIGHT)}
        dataKey={GameElement.LIGHT}
        stackId="turn"
        fill={GameElementHelper.getElementColor(GameElement.LIGHT)}
      />
      <ByElement.Bar
        name={GameElementHelper.getPrettyElementName(GameElement.DARK)}
        dataKey={GameElement.DARK}
        stackId="turn"
        fill={GameElementHelper.getElementColor(GameElement.DARK)}
      />
      <ByElement.Bar
        name={GameElementHelper.getPrettyElementName(GameElement.DESTRUCTION)}
        dataKey={GameElement.DESTRUCTION}
        stackId="turn"
        fill={GameElementHelper.getElementColor(GameElement.DESTRUCTION)}
      />
    </ByElement.BarChart>
  );
}

function totalDamageByTypeTimeSeries(battleData: GodsightBattleData) {
  const allTurns = Object.keys(battleData["turnData"]).map(t => Number(t));

  const allTurnStats = allTurns.map(t => {
    return {
      turn: t,
      stats: battleData["turnData"][t]["turnStats"],
    };
  });

  const data = allTurnStats.map(statsByTurn => {
    const totalNormalAttackDamage = Math.round(Object.keys(statsByTurn.stats["normalAttackDamage"]).map(element => {
      return statsByTurn.stats["normalAttackDamage"][element];
    }).reduce((prev, cur) => prev + cur, 0));

    const totalChargedAttackDamage = Math.round(Object.keys(statsByTurn.stats["chargedAttackDamage"]).map(element => {
      return statsByTurn.stats["chargedAttackDamage"][element];
    }).reduce((prev, cur) => prev + cur, 0));

    const totalSkillDamage = Math.round(Object.keys(statsByTurn.stats["skillDamage"]).map(element => {
      return statsByTurn.stats["skillDamage"][element];
    }).reduce((prev, cur) => prev + cur, 0));

    const totalOtherDamage = Math.round(Object.keys(statsByTurn.stats["otherDamage"]).map(element => {
      return statsByTurn.stats["otherDamage"][element];
    }).reduce((prev, cur) => prev + cur, 0));

    return {
      turn: `${statsByTurn.turn}`,
      normalAttackDamage: totalNormalAttackDamage,
      skillDamage: totalSkillDamage,
      chargedAttackDamage: totalChargedAttackDamage,
      otherDamage: totalOtherDamage,
    };
  });

  const labelColors = {
    "NA": DamageTypeColors.NORMAL_ATTACK,
    "CA": DamageTypeColors.CHARGED_ATTACK,
    "Skill": DamageTypeColors.SKILL,
    "Other": DamageTypeColors.OTHER,
  };

  const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
    if (active && payload && payload.length) {
      // Filter out items with a value of 0 (and optionally null/undefined)
      const filteredPayload = payload.filter((item) => item.value !== 0 && item.value != null);

      // If everything is filtered out, render nothing
      if (filteredPayload.length === 0) return null;

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: '#282828',
            padding: '10px',
            border: "1px solid #c2c2c2"
          }}>
          <p className="label">Turn {label}</p>
          {filteredPayload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: labelColors[entry.name as keyof typeof labelColors] }}>
              {entry.name}: {entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <ByType.BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <ByType.XAxis dataKey="turn" niceTicks="snap125" />
      <ByType.YAxis width="auto" niceTicks="snap125" />
      <Tooltip
        labelFormatter={(label) => `Turn ${label}`}
        formatter={(a) => a?.toLocaleString()}
        content={CustomTooltip}
      />
      <Legend itemSorter={null} />
      <ByType.Bar name="NA" dataKey="normalAttackDamage" stackId="turn" fill={DamageTypeColors.NORMAL_ATTACK} />
      <ByType.Bar name="CA" dataKey="chargedAttackDamage" stackId="turn" fill={DamageTypeColors.CHARGED_ATTACK} />
      <ByType.Bar name="Skill" dataKey="skillDamage" stackId="turn" fill={DamageTypeColors.SKILL} />
      <ByType.Bar name="Other" dataKey="otherDamage" stackId="turn" fill={DamageTypeColors.OTHER} />
    </ByType.BarChart>
  );
}

export function TimeSeries({
  battleData,
  view,
  characterIndex,
}: {
  battleData: GodsightBattleData,
  view: StatsView,
  characterIndex: number,
}) {
  let viewResult = <></>;

  const [selectedBreakdown, setSelectedBreakdown] = useState(Breakdown.BY_TYPE);

  switch (view) {
    case StatsView.CHARACTER:
      viewResult = (
        <>Character view.</>
      );
      break;
    case StatsView.DPT:
    case StatsView.TOTAL:
      if (selectedBreakdown == Breakdown.BY_TYPE) {
        viewResult = totalDamageByTypeTimeSeries(battleData);
      } else if (selectedBreakdown == Breakdown.BY_ELEMENT) {
        viewResult = totalDamageByElementTimeSeries(battleData);
      }
      break;
    case StatsView.CURRENT_TURN:
    case StatsView.PREV_TURN:
    default:
      viewResult = (
        <>Unsupported time series view.</>
      );
      break;
  }

  return (
    <>
      <div className="breakdown-selector-container sub-selector">
        <div
          className={selectedBreakdown == Breakdown.BY_TYPE ? "breakdown-option selected" : "breakdown-option"}
          onClick={() => setSelectedBreakdown(Breakdown.BY_TYPE)}
        >Type</div>
        <div
          className={selectedBreakdown == Breakdown.BY_ELEMENT ? "breakdown-option selected" : "breakdown-option"}
          onClick={() => setSelectedBreakdown(Breakdown.BY_ELEMENT)}
        >Element</div>
      </div>
      <div className="battle-stats-deepdive">
        {viewResult}
      </div>
    </>
  );
}