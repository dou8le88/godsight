import { JSX, useDeferredValue, ViewTransition } from 'react';
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
  if (currentHp > maxHp) {
    console.error(
      `Detected currentHp (${currentHp}) > maxHp (${maxHp}) for actor ${actor}`,
    );
  }

  function getWrapper(jsx: JSX.Element) {
    return actor == Actor.PLAYER ? (
      <div
        className="avatar-hp-bar-wrapper"
        title={`${currentHp.toLocaleString()} / ${maxHp.toLocaleString()}`}
      >
        {jsx}
      </div>
    ) : (
      <>{jsx}</>
    );
  }

  // Knowing a character is at exactly 100% HP is useful for players,
  // so we only display 100% if that's true.
  // Bosses, on the other hand, can remain at "100%" HP even after taking
  // damage, because they use a `ceil` calculation ingame. We imitate that here.
  const rawCurrentHpPercent = (currentHp / maxHp) * 100;
  const currentHpPercent =
    actor == Actor.PLAYER
      ? currentHp == maxHp
        ? 100
        : Math.min(Math.ceil(rawCurrentHpPercent), 99)
      : Math.ceil(rawCurrentHpPercent);
  const deferredHpPercent = useDeferredValue(currentHpPercent);

  const additionalClasses =
    actor == Actor.PLAYER && rawCurrentHpPercent <= 25 ? 'critical' : '';

  return getWrapper(
    <div className={`hp-bar ${actor} ${additionalClasses}`}>
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
    </div>,
  );
}
