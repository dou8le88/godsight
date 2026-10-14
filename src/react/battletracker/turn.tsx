import { TurnData } from '../../godsight/battletypes/turndata';
import Action from './action';
import { StatsShower } from './statsshower';

export default function Turn({
  turnData,
  turnNumber,
}: {
  turnData: TurnData;
  turnNumber: number;
}) {
  return (
    <details
      className="turn"
      open={true}
    >
      <summary className="turn-counter">Turn {turnNumber}</summary>

      <div className="turn-action-container">
        {turnData['turnActions'].map((action, idx) => (
          <Action
            key={idx}
            idx={idx}
            action={action}
          />
        ))}
      </div>
      <StatsShower stats={turnData['turnStats']} />
    </details>
  );
}
