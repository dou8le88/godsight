import { useDeferredValue, ViewTransition } from 'react';
import { Actor } from '../../gbf/battletypes/scenariodata/mechanics/actor';

export function HpBar({
  currentHp,
  maxHp,
  actor,
}: {
  currentHp: number;
  maxHp: number;
  actor: Actor;
}) {
  const currentHpPercent = Math.ceil((currentHp / maxHp) * 100);
  const deferredHpPercent = useDeferredValue(currentHpPercent);

  return (
    <div className={`hp-bar ${actor}`}>
      <ViewTransition update="hp-decrease">
        <div
          className="damage-diff"
          style={{
            width: `calc(${deferredHpPercent}% - 2px)`,
          }}
        ></div>
        <div
          className="current-hp"
          style={{
            width: `calc(${currentHpPercent}% - 2px)`,
          }}
        ></div>
      </ViewTransition>
      <div className="hp-percent">{currentHpPercent}%</div>
    </div>
  );
}
