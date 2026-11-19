import { chrome } from 'vitest-chrome';
import { screen } from '@testing-library/react';

export function replayRequest(endpoint: string, data: string) {
  chrome.devtools.network.onRequestFinished.callListeners({
    request: {
      url: `https://game.granbluefantasy.jp/rest/multiraid/${endpoint}`,
    } as any,
    response: {
      status: 200,
    } as any,
    getContent: (callback: (content: string, encoding: string) => void) => {
      return callback(data, 'UTF-8');
    },
  } as chrome.devtools.network.Request);
}

export function tileValue(
  tileHeader: string,
  statLabel: string,
): string | undefined {
  const tileContainers = screen
    .getAllByText(tileHeader)
    .map((header) => header.parentElement)
    .filter((container): container is HTMLElement => container !== null);

  for (const container of tileContainers) {
    const line = Array.from(container.querySelectorAll('.stat-line')).find(
      (candidate) =>
        candidate.querySelector('.stat-label')?.textContent?.trim() ==
        statLabel,
    );
    if (line) {
      return line.querySelector('.stat-value')?.textContent?.trim();
    }
  }

  return undefined;
}
