import { TurnData } from "../../godsight/battletypes/turndata";
import Action from "./action";

export default function Turn({ turnData, turnNumber }: { turnData: TurnData, turnNumber: number }) {
  return (
    <details className="turn" open={true}>
      <summary className="turn-counter">Turn {turnNumber}</summary>

      <div className="turn-action-container">
        {turnData["turnActions"].map(action =>
          <Action action={action} />
        )}
      </div>
    </details>
  );
}