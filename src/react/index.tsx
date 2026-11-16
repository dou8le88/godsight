// Globally compile all zod schemas
import 'zod/compile';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import GodsightPanel from './app';

interface ErrorInfo {
  componentStack?: string | undefined;
  errorBoundary?: React.Component<unknown> | undefined;
}

function handleIgnoredError(
  error: unknown,
  errorInfo: ErrorInfo,
  handleUnignoredError: () => void,
) {
  if (
    error &&
    (error as Error).message &&
    (error as Error).message.includes(
      'Transition was aborted because of invalid state. Document hidden',
    )
  ) {
    // ignore
  } else {
    handleUnignoredError();
  }
}

const root = createRoot(document.getElementById('root')!, {
  onCaughtError: (error, errorInfo) => {
    handleIgnoredError(error, errorInfo, () => {
      console.error('Caught by boundary:', error, errorInfo.componentStack);
    });
  },
  onUncaughtError: (error, errorInfo) => {
    handleIgnoredError(error, errorInfo, () => {
      console.error('Uncaught crash:', error, errorInfo.componentStack);
    });
  },
  onRecoverableError: (error, errorInfo) => {
    handleIgnoredError(error, errorInfo, () => {
      console.error(
        'Uncaught recoverable error:',
        error,
        errorInfo.componentStack,
      );
    });
  },
});

root.render(
  <StrictMode>
    <GodsightPanel />
  </StrictMode>,
);
