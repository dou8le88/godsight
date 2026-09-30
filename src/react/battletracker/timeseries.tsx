import { GodsightBattleData } from "../../godsight/battletypes/battledata";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, createHorizontalChart, TooltipContentProps } from 'recharts';
import { StatsView } from "./statsview";
import { DamageTypeColors } from "./damagetypecolors";
import { useState } from "react";
import { Breakdown } from "./breakdown";
import { GameElement, GameElementHelper } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { CharacterColors } from "./charactercolors";
import { Stats } from "../../godsight/battletypes/stats";

interface ByTypeChartData {
  turn: string,
  normalAttackDamage: number,
  skillDamage: number,
  chargedAttackDamage: number,
  otherDamage: number,
  totalDamage: number,
}

interface ByElementChartData {
  turn: string,
  total: number,
  [GameElement.NULL_PLAIN]: number,
  [GameElement.FIRE]: number,
  [GameElement.WATER]: number,
  [GameElement.EARTH]: number,
  [GameElement.WIND]: number,
  [GameElement.LIGHT]: number,
  [GameElement.DARK]: number,
  [GameElement.DESTRUCTION]: number,
}

interface ByCharacterChartData {
  turn: string,
  totalDamage: number,
  [key: number]: number,
}

interface TurnStats {
  turn: number,
  stats: Stats,
}

interface ByCharacterTurnStats {
  turn: number,
  stats: Record<string | number, Stats>,
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

const ByCharacter = createHorizontalChart<ByCharacterChartData, string, number>()({
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
});

function getDamageByTypeData(turnStats: TurnStats[]): ByTypeChartData[] {
  return turnStats.map(statsByTurn => {
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
      totalDamage: totalNormalAttackDamage + totalSkillDamage + totalChargedAttackDamage + totalOtherDamage + statsByTurn["stats"]["dotDamage"],
    };
  });
}

function getDamageByElementData(turnStats: TurnStats[]): ByElementChartData[] {
  return turnStats.map(statsByTurn => {
    const allElements = GameElementHelper.getAllElements();
    const elementTotals: ByElementChartData = {
      turn: `${statsByTurn.turn}`,
      total: 0,
    } as ByElementChartData;

    allElements.forEach(elt => {
      elementTotals[elt] = 0;
    });

    allElements.forEach(elt => {
      elementTotals[elt] += statsByTurn.stats["normalAttackDamage"][elt];
      elementTotals["total"] += statsByTurn.stats["normalAttackDamage"][elt];
      elementTotals[elt] += statsByTurn.stats["chargedAttackDamage"][elt];
      elementTotals["total"] += statsByTurn.stats["chargedAttackDamage"][elt];
      elementTotals[elt] += statsByTurn.stats["skillDamage"][elt];
      elementTotals["total"] += statsByTurn.stats["skillDamage"][elt];
      elementTotals[elt] += statsByTurn.stats["otherDamage"][elt];
      elementTotals["total"] += statsByTurn.stats["otherDamage"][elt];
      if (elt == GameElement.NULL_PLAIN) {
        elementTotals[elt] += statsByTurn.stats["dotDamage"];
        elementTotals["total"] += statsByTurn.stats["dotDamage"];
      }
    });

    return elementTotals;
  });
}

function getDamageByCharacterData(turnStats: ByCharacterTurnStats[], allCharacters: number[]): ByCharacterChartData[] {
  return turnStats.map(statsByTurn => {
    const characterData = allCharacters.map(charIdx => {
      const totalNormalAttackDamage = Math.round(Object.keys(statsByTurn.stats[charIdx]["normalAttackDamage"]).map(element => {
        return statsByTurn.stats[charIdx]["normalAttackDamage"][element];
      }).reduce((prev, cur) => prev + cur, 0));

      const totalChargedAttackDamage = Math.round(Object.keys(statsByTurn.stats[charIdx]["chargedAttackDamage"]).map(element => {
        return statsByTurn.stats[charIdx]["chargedAttackDamage"][element];
      }).reduce((prev, cur) => prev + cur, 0));

      const totalSkillDamage = Math.round(Object.keys(statsByTurn.stats[charIdx]["skillDamage"]).map(element => {
        return statsByTurn.stats[charIdx]["skillDamage"][element];
      }).reduce((prev, cur) => prev + cur, 0));

      const totalOtherDamage = Math.round(Object.keys(statsByTurn.stats[charIdx]["otherDamage"]).map(element => {
        return statsByTurn.stats[charIdx]["otherDamage"][element];
      }).reduce((prev, cur) => prev + cur, 0));

      return {
        [charIdx]: totalNormalAttackDamage + totalChargedAttackDamage + totalSkillDamage + totalOtherDamage,
      };
    }).reduce((acc, cur) => {
      return { ...acc, ...cur };
    }, {});

    const totalDamage = Object.values(characterData).reduce((prev, cur) => prev + cur);

    return {
      turn: `${statsByTurn.turn}`,
      totalDamage,
      ...characterData,
    };
  });
}

function damageByTypeTimeSeries(data: ByTypeChartData[]) {
  const labelColors = {
    "NA": DamageTypeColors.NORMAL_ATTACK,
    "CA": DamageTypeColors.CHARGED_ATTACK,
    "Skill": DamageTypeColors.SKILL,
    "Other": DamageTypeColors.OTHER,
  };

  const CustomTooltip = ({ active, payload, label, activeIndex }: TooltipContentProps) => {
    if (active && payload && payload.length) {
      // Filter out items with a value of 0 (and optionally null/undefined)
      const filteredPayload = payload.filter((item) => item.value !== 0 && item.value != null);

      // If everything is filtered out, render nothing
      if (filteredPayload.length === 0) return null;

      const totalDamage = data[Number(activeIndex)]["totalDamage"];

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: '#282828',
            padding: '10px',
            border: "1px solid #c2c2c2"
          }}>
          <p className="label">Turn {label}</p>
          <p className="label">Total: {totalDamage.toLocaleString()}</p>
          {filteredPayload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: labelColors[entry.name as keyof typeof labelColors] }}>
              {entry.name}: {entry.value?.toLocaleString()} ({((Number(entry.value) / totalDamage) * 100).toFixed(0)}%)
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
      <ByType.YAxis width="auto" niceTicks="snap125" tickFormatter={(value) => Number(value).toLocaleString()} />
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

function damageByElementTimeSeries(data: ByElementChartData[]) {
  const labelColors = GameElementHelper.getAllElements().map(elt => {
    return { [GameElementHelper.getPrettyElementName(elt)]: GameElementHelper.getElementColor(elt) };
  }).reduce((acc, cur) => {
    return { ...acc, ...cur };
  }, {});

  const CustomTooltip = ({ active, payload, label, activeIndex }: TooltipContentProps) => {
    if (active && payload && payload.length) {
      // Filter out items with a value of 0 (and optionally null/undefined)
      const filteredPayload = payload.filter((item) => item.value !== 0 && item.value != null);

      // If everything is filtered out, render nothing
      if (filteredPayload.length === 0) return null;

      const totalDamage = data[Number(activeIndex)]["total"];

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: '#282828',
            padding: '10px',
            border: "1px solid #c2c2c2"
          }}>
          <p className="label">Turn {label}</p>
          <p className="label">Total: {totalDamage.toLocaleString()}</p>
          {filteredPayload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: labelColors[entry.name as keyof typeof labelColors] }}>
              {entry.name}: {entry.value?.toLocaleString()} ({((Number(entry.value) / totalDamage) * 100).toFixed(0)}%)
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
      <ByElement.YAxis width="auto" niceTicks="snap125" tickFormatter={(value) => Number(value).toLocaleString()} />
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

function damageByCharacterTimeSeries(battleData: GodsightBattleData, data: ByCharacterChartData[], allCharacters: number[]) {
  const CustomTooltip = ({ active, payload, label, activeIndex }: TooltipContentProps) => {
    if (active && payload && payload.length) {

      const numericIndex = Number(activeIndex);
      const totalDamage = data[numericIndex]["totalDamage"];

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: '#282828',
            padding: '10px',
            border: "1px solid #c2c2c2"
          }}>
          <p className="label">Turn {label}</p>
          <p className="label">Total: {totalDamage.toLocaleString()}</p>
          {payload.map((entry, index) => (
            entry.value !== 0 && entry.value != null ?
              <p key={`item-${index}`} style={{ color: CharacterColors[index] }}>
                {entry.name}: {entry.value?.toLocaleString()} ({((Number(entry.value) / totalDamage) * 100).toFixed(0)}%)
              </p> :
              <span key={`item-${index}`}></span>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <ByCharacter.BarChart
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
      <ByCharacter.XAxis dataKey="turn" niceTicks="snap125" />
      <ByCharacter.YAxis width="auto" niceTicks="snap125" tickFormatter={(value) => Number(value).toLocaleString()} />
      <Tooltip
        labelFormatter={(label) => `Turn ${label}`}
        formatter={(a) => a?.toLocaleString()}
        content={CustomTooltip}
      />
      <Legend itemSorter={null} />
      {allCharacters.map(charIdx => (
        <ByCharacter.Bar
          key={charIdx}
          name={battleData["party"]["members"][charIdx]["name"]}
          dataKey={charIdx}
          stackId="turn"
          fill={CharacterColors[charIdx]}
        />
      ))}

    </ByCharacter.BarChart>
  );
}

function totalDamageByElementTimeSeries(battleData: GodsightBattleData) {
  const allTurns = Object.keys(battleData["turnData"]).map(t => Number(t));

  const allTurnStats: TurnStats[] = allTurns.map(t => {
    return {
      turn: t,
      stats: battleData["turnData"][t]["turnStats"],
    };
  });

  const data = getDamageByElementData(allTurnStats);

  return damageByElementTimeSeries(data);
}

function totalDamageByTypeTimeSeries(battleData: GodsightBattleData) {
  const allTurns = Object.keys(battleData["turnData"]).map(t => Number(t));

  const allTurnStats = allTurns.map(t => {
    return {
      turn: t,
      stats: battleData["turnData"][t]["turnStats"],
    };
  });

  const data = getDamageByTypeData(allTurnStats);

  return damageByTypeTimeSeries(data);
}

function totalDamageByCharacterTimeSeries(battleData: GodsightBattleData) {
  const allTurns = Object.keys(battleData["turnData"]).map(t => Number(t));
  const allCharacters = Array.from({ length: battleData["party"]["members"].length }, (_, idx) => idx);

  const allTurnStats = allTurns.map(t => {
    return {
      turn: t,
      stats: battleData["turnData"][t]["characterCurrentTurnStats"],
    };
  });

  const data: ByCharacterChartData[] = getDamageByCharacterData(allTurnStats, allCharacters);

  return damageByCharacterTimeSeries(battleData, data, allCharacters);
}

function totalCharacterDamageByTypeTimeSeries(battleData: GodsightBattleData, characterIndex: number) {
  const allTurns = Object.keys(battleData["turnData"]).map(t => Number(t));

  const allTurnStats = allTurns.map(t => {
    return {
      turn: t,
      stats: battleData["turnData"][t]["characterCurrentTurnStats"][characterIndex],
    };
  });

  const data = getDamageByTypeData(allTurnStats);

  return damageByTypeTimeSeries(data);
}

function totalCharacterDamageByElementTimeSeries(battleData: GodsightBattleData, characterIndex: number) {
  const allTurns = Object.keys(battleData["turnData"]).map(t => Number(t));

  const allTurnStats = allTurns.map(t => {
    return {
      turn: t,
      stats: battleData["turnData"][t]["characterCurrentTurnStats"][characterIndex],
    };
  });

  const data = getDamageByElementData(allTurnStats);

  return damageByElementTimeSeries(data);
}

function omenContributingDamageByTypeTimeSeries(battleData: GodsightBattleData) {
  const allTurns = Object.keys(battleData["turnData"]).map(t => Number(t));

  const allTurnStats = allTurns.map(t => {
    return {
      turn: t,
      stats: battleData["turnData"][t]["beforeBossTurnStats"],
    };
  });

  const data = getDamageByTypeData(allTurnStats);

  return damageByTypeTimeSeries(data);
}

function omenContributingDamageByElementTimeSeries(battleData: GodsightBattleData) {
  const allTurns = Object.keys(battleData["turnData"]).map(t => Number(t));

  const allTurnStats = allTurns.map(t => {
    return {
      turn: t,
      stats: battleData["turnData"][t]["beforeBossTurnStats"],
    };
  });

  const data = getDamageByElementData(allTurnStats);

  return damageByElementTimeSeries(data);
}

function omenContributingDamageByCharacterTimeSeries(battleData: GodsightBattleData) {
  const allTurns = Object.keys(battleData["turnData"]).map(t => Number(t));
  const allCharacters = Array.from({ length: battleData["party"]["members"].length }, (_, idx) => idx);

  const allTurnStats = allTurns.map(t => {
    return {
      turn: t,
      stats: battleData["turnData"][t]["characterBeforeBossTurnStats"],
    };
  });

  const data = getDamageByCharacterData(allTurnStats, allCharacters);

  return damageByCharacterTimeSeries(battleData, data, allCharacters);
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
      if (selectedBreakdown == Breakdown.BY_TYPE) {
        viewResult = totalCharacterDamageByTypeTimeSeries(battleData, characterIndex);
      } else if (selectedBreakdown == Breakdown.BY_ELEMENT) {
        viewResult = totalCharacterDamageByElementTimeSeries(battleData, characterIndex);
      }
      break;
    case StatsView.DPT:
    case StatsView.TOTAL:
      if (selectedBreakdown == Breakdown.BY_TYPE) {
        viewResult = totalDamageByTypeTimeSeries(battleData);
      } else if (selectedBreakdown == Breakdown.BY_ELEMENT) {
        viewResult = totalDamageByElementTimeSeries(battleData);
      } else if (selectedBreakdown == Breakdown.BY_CHARACTER) {
        viewResult = totalDamageByCharacterTimeSeries(battleData);
      }
      break;
    case StatsView.PREV_TURN_BEFORE_BOSS_ACTION:
      if (selectedBreakdown == Breakdown.BY_TYPE) {
        viewResult = omenContributingDamageByTypeTimeSeries(battleData);
      } else if (selectedBreakdown == Breakdown.BY_ELEMENT) {
        viewResult = omenContributingDamageByElementTimeSeries(battleData);
      } else if (selectedBreakdown == Breakdown.BY_CHARACTER) {
        viewResult = omenContributingDamageByCharacterTimeSeries(battleData);
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
        {view != StatsView.CHARACTER ?
          <div
            className={selectedBreakdown == Breakdown.BY_CHARACTER ? "breakdown-option selected" : "breakdown-option"}
            onClick={() => setSelectedBreakdown(Breakdown.BY_CHARACTER)}
          >Character</div> :
          <></>
        }
      </div>
      <div className="battle-stats-deepdive">
        {viewResult}
      </div>
    </>
  );
}