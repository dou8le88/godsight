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
      <div className="dynamic-hp-bar-wrapper">
        <ViewTransition update="hp-decrease">
          <div
            className="damage-diff"
            style={{
              width: `${deferredHpPercent}%`,
            }}
          ></div>
          <div
            className="current-hp"
            style={{
              width: `${currentHpPercent}%`,
            }}
          ></div>
        </ViewTransition>
      </div>
      <div className="hp-percent">{currentHpPercent}%</div>
      <div className="exact-hp">
        {currentHp.toLocaleString()} / {maxHp.toLocaleString()}
      </div>
    </div>
  );
}
