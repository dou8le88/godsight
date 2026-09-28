export function Config({ onExit }: { onExit: () => void }) {

  return (
    <>
      <div className="config-overlay-mask"></div>
      <div className="config-window">
        <div className="config-header">
          <div>
            Configuration
          </div>
          <div className="exit-icon" onClick={() => onExit()}>
            X
          </div>
        </div>
        <div className="config-body">
          Config options here.
        </div>
      </div>
    </>
  );
}