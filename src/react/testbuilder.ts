import { GodsightBattleData } from '../godsight/battletypes/battledata';
import { StatsUpdateHelper } from '../godsight/battletypes/stats';
import { range } from '../util/range';

export class TestBuilder {
  static saveBattleDataForTest(
    endpoint: string,
    fileCount: number,
    raidId: number,
    data: unknown,
  ) {
    const blob = new Blob(
      [
        `export default {"endpoint": ${JSON.stringify(endpoint)}, "data": ${JSON.stringify(JSON.stringify(data))}};`,
      ],
      {
        'type': 'application/octet-stream',
      },
    );
    const blobUrl = URL.createObjectURL(blob);
    const filename = `${fileCount}`.padStart(4, '0');

    chrome.downloads.download({
      'url': blobUrl,
      'filename': `${raidId}/${filename}.ts`,
    });
  }

  static buildTestFileFromDownloadedData(
    downloadFileCounter: number,
    battleData: GodsightBattleData,
  ): string {
    let imports = `import { act, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GodsightPanel from '../../../react/app';
import { chrome } from 'vitest-chrome';
import { replayRequest, tileValue } from '../../testhelpers';\n`;
    for (let i = 0; i < downloadFileCounter; i++) {
      imports += `import Request_${i} from './${i.toString().padStart(4, '0')}';\n`;
    }

    const totalStats = StatsUpdateHelper.getTotalDamage(
      battleData['battleStats']['generalStats'],
    );

    const statsByCharacter: Record<
      string | number,
      {
        totalNormalAttackDamage: number;
        totalChargedAttackDamage: number;
        totalSkillDamage: number;
        totalOtherDamage: number;
        totalDamage: number;
      }
    > = {};

    for (const [characterId, stats] of Object.entries(
      battleData['battleStats']['characterStats'],
    )) {
      statsByCharacter[characterId] = StatsUpdateHelper.getTotalDamage(stats);
    }

    const body = `const Requests = [\n  ${range(0, downloadFileCounter - 1)
      .map((i) => `Request_${i}`)
      .join(',\n  ')},\n];

describe('${battleData['boss'][0]['name']}', () => {
  it('should replay the battle data correctly', async () => {
    // @ts-expect-error: Custom property injected at runtime
    chrome.devtools.inspectedWindow.setEvalResponse(
      'window.location.href',
      'https://game.granbluefantasy.jp/',
    );
    // @ts-expect-error: Custom property injected at runtime
    chrome.devtools.inspectedWindow.setEvalResponse(
      'window.location.hash',
      '#raid_multi/${battleData['raidId']}',
    );
    chrome.runtime.getManifest.mockImplementation(() => {
      return {
        'name': 'Godsight',
        'description': 'A Granblue Fantasy battle analysis extension.',
        'version': 'test',
        'manifest_version': 3,
        'devtools_page': 'devtools.html',
        'permissions': ['storage', 'unlimitedStorage', 'downloads'],
      };
    });

    render(<GodsightPanel />);

    for (const request of Requests) {
      await act(async () => {
        replayRequest(request.endpoint, request.data);
      });
    }

    expect(tileValue('Totals', 'Total DMG:')).toBe('${totalStats['totalDamage'].toLocaleString()}');
    expect(tileValue('Totals', 'NA DMG:')).toBe('${totalStats['totalNormalAttackDamage'].toLocaleString()}');
    expect(tileValue('Totals', 'Skill DMG:')).toBe('${totalStats['totalSkillDamage'].toLocaleString()}');
    expect(tileValue('Totals', 'CA DMG:')).toBe('${totalStats['totalChargedAttackDamage'].toLocaleString()}');
    expect(tileValue('Totals', 'Other DMG:')).toBe('${totalStats['totalOtherDamage'].toLocaleString()}');
    expect(tileValue('Totals', 'Hit count:')).toBe('${battleData['battleStats']['generalStats']['hitCount']}');
    expect(tileValue('Totals', 'NA hits:')).toBe('${battleData['battleStats']['generalStats']['normalAttackHits']}');
    expect(tileValue('Totals', 'Skill hits:')).toBe('${battleData['battleStats']['generalStats']['skillHits']}');
    expect(tileValue('Totals', 'Debuffs:')).toBe('${battleData['battleStats']['generalStats']['debuffsInflictedCount']}');
    expect(tileValue('Totals', 'TAs:')).toBe('${
      battleData['battleStats']['generalStats']['normalAttacks'] > 0
        ? `${battleData['battleStats']['generalStats']['tripleAttacks']}/${battleData['battleStats']['generalStats']['normalAttacks']} (${((battleData['battleStats']['generalStats']['tripleAttacks'] / battleData['battleStats']['generalStats']['normalAttacks']) * 100).toFixed(0)}%)`
        : '0/0 (--%)'
    }');

    ${Object.entries(statsByCharacter)
      .map(([characterId, stats]) => {
        return `expect(tileValue('${battleData['party']['members'][Number(characterId)]['name']}', 'Total DMG:')).toBe('${stats['totalDamage'].toLocaleString()}');
    expect(tileValue('${battleData['party']['members'][Number(characterId)]['name']}', 'NA DMG:')).toBe('${stats['totalNormalAttackDamage'].toLocaleString()}');
    expect(tileValue('${battleData['party']['members'][Number(characterId)]['name']}', 'Skill DMG:')).toBe('${stats['totalSkillDamage'].toLocaleString()}');
    expect(tileValue('${battleData['party']['members'][Number(characterId)]['name']}', 'CA DMG:')).toBe('${stats['totalChargedAttackDamage'].toLocaleString()}');
    expect(tileValue('${battleData['party']['members'][Number(characterId)]['name']}', 'Other DMG:')).toBe('${stats['totalOtherDamage'].toLocaleString()}');
    expect(tileValue('${battleData['party']['members'][Number(characterId)]['name']}', 'Hit count:')).toBe('${battleData['battleStats']['characterStats'][characterId]['hitCount']}');
    expect(tileValue('${battleData['party']['members'][Number(characterId)]['name']}', 'NA hits:')).toBe('${battleData['battleStats']['characterStats'][characterId]['normalAttackHits']}');
    expect(tileValue('${battleData['party']['members'][Number(characterId)]['name']}', 'Skill hits:')).toBe('${battleData['battleStats']['characterStats'][characterId]['skillHits']}');
    expect(tileValue('${battleData['party']['members'][Number(characterId)]['name']}', 'Debuffs:')).toBe('${battleData['battleStats']['characterStats'][characterId]['debuffsInflictedCount']}');
    expect(tileValue('${battleData['party']['members'][Number(characterId)]['name']}', 'TAs:')).toBe('${
      battleData['battleStats']['characterStats'][characterId][
        'normalAttacks'
      ] > 0
        ? `${battleData['battleStats']['characterStats'][characterId]['tripleAttacks']}/${battleData['battleStats']['characterStats'][characterId]['normalAttacks']} (${((battleData['battleStats']['characterStats'][characterId]['tripleAttacks'] / battleData['battleStats']['characterStats'][characterId]['normalAttacks']) * 100).toFixed(0)}%)`
        : '0/0 (--%)'
    }');`;
      })
      .join('\n    ')}
  });
})`;
    return `${imports}\n${body}`;
  }
}
