import { GodsightPartyMemberData } from '../../godsight/battletypes/partyformationdata';
import { Stats } from '../../godsight/battletypes/stats';
import { useGodsightSettings } from '../../godsight/settings/usegodsightsettings';
import Avatar from './avatar';

export function StatsShower({
  stats,
  header,
  character,
  backline,
  searchable,
  onClick,
}: {
  stats: Stats;
  header?: string;
  character?: GodsightPartyMemberData;
  backline?: boolean;
  searchable?: boolean;
  onClick?: () => void;
}) {
  const settings = useGodsightSettings();

  const allStatKeys = Object.keys(
    settings['visibleStats'],
  ) as (keyof (typeof settings)['visibleStats'])[];

  const allStatsDisabled = allStatKeys.every(
    (key) => !settings['visibleStats'][key],
  );

  const totalNormalAttackDamage = Math.round(
    Object.keys(stats['normalAttackDamage'])
      .map((element) => {
        return stats['normalAttackDamage'][element];
      })
      .reduce((prev, cur) => prev + cur, 0),
  );

  const totalChargedAttackDamage = Math.round(
    Object.keys(stats['chargedAttackDamage'])
      .map((element) => {
        return stats['chargedAttackDamage'][element];
      })
      .reduce((prev, cur) => prev + cur, 0),
  );

  const totalSkillDamage = Math.round(
    Object.keys(stats['skillDamage'])
      .map((element) => {
        return stats['skillDamage'][element];
      })
      .reduce((prev, cur) => prev + cur, 0),
  );

  const totalOtherDamage = Math.round(
    Object.keys(stats['otherDamage'])
      .map((element) => {
        return stats['otherDamage'][element];
      })
      .reduce((prev, cur) => prev + cur, 0),
  );

  const hitCount = Math.round(stats['hitCount']);
  const normalAttackHits = Math.round(stats['normalAttackHits']);
  const skillHits = Math.round(stats['skillHits']);
  const chargedAttackHits = Math.round(stats['chargedAttackHits']);
  const otherHits = Math.round(stats['otherHits']);
  const debuffs = Math.round(stats['debuffsInflictedCount']);

  const dotDamage = Math.round(stats['dotDamage']);

  const totalDamage =
    totalNormalAttackDamage +
    totalChargedAttackDamage +
    totalSkillDamage +
    totalOtherDamage +
    dotDamage;

  let className = 'stats-list';
  if (character) {
    className += ' for-character';
  }
  if (onClick) {
    className += ' clickable';
  }
  if (searchable) {
    className += ' searchable';
  }

  const tripleAttackRate =
    stats['normalAttacks'] > 0
      ? `${((stats['tripleAttacks'] / stats['normalAttacks']) * 100).toFixed(0)}`
      : '--';

  return (
    <div
      className={className}
      {...(onClick && { 'onClick': () => onClick() })}
    >
      {character ? (
        <Avatar
          key={character['characterId']}
          characterData={character}
          backline={backline}
        />
      ) : (
        <></>
      )}
      <div className="stats-container">
        {header ? <div className="stats-header">{header}</div> : <></>}
        {settings['visibleStats']['totalDamage'] ? (
          <div className="stat-line">
            <span className="stat-label">Total DMG:</span>{' '}
            <span className="stat-value">{totalDamage.toLocaleString()}</span>
          </div>
        ) : (
          <></>
        )}
        {settings['visibleStats']['normalAttackDamage'] ? (
          <div className="stat-line">
            <span className="stat-label">NA DMG:</span>{' '}
            <span className="stat-value">
              {totalNormalAttackDamage.toLocaleString()}
            </span>
          </div>
        ) : (
          <></>
        )}
        {settings['visibleStats']['skillDamage'] ? (
          <div className="stat-line">
            <span className="stat-label">Skill DMG:</span>{' '}
            <span className="stat-value">
              {totalSkillDamage.toLocaleString()}
            </span>
          </div>
        ) : (
          <></>
        )}
        {settings['visibleStats']['chargedAttackDamage'] ? (
          <div className="stat-line">
            <span className="stat-label">CA DMG:</span>{' '}
            <span className="stat-value">
              {totalChargedAttackDamage.toLocaleString()}
            </span>
          </div>
        ) : (
          <></>
        )}
        {settings['visibleStats']['otherDamage'] ? (
          <div className="stat-line">
            <span className="stat-label">Other DMG:</span>{' '}
            <span className="stat-value">
              {totalOtherDamage.toLocaleString()}
            </span>
          </div>
        ) : (
          <></>
        )}
        {settings['visibleStats']['hitCount'] ? (
          <div className="stat-line">
            <span className="stat-label">Hit count:</span>{' '}
            <span className="stat-value">{hitCount}</span>
          </div>
        ) : (
          <></>
        )}
        {settings['visibleStats']['normalAttackHits'] ? (
          <div className="stat-line">
            <span className="stat-label">NA hits:</span>{' '}
            <span className="stat-value">{normalAttackHits}</span>
          </div>
        ) : (
          <></>
        )}
        {settings['visibleStats']['skillHits'] ? (
          <div className="stat-line">
            <span className="stat-label">Skill hits:</span>{' '}
            <span className="stat-value">{skillHits}</span>
          </div>
        ) : (
          <></>
        )}
        {settings['visibleStats']['chargedAttackHits'] ? (
          <div className="stat-line">
            <span className="stat-label">CA hits:</span>{' '}
            <span className="stat-value">{chargedAttackHits}</span>
          </div>
        ) : (
          <></>
        )}
        {settings['visibleStats']['otherHits'] ? (
          <div className="stat-line">
            <span className="stat-label">Other hits:</span>{' '}
            <span className="stat-value">{otherHits}</span>
          </div>
        ) : (
          <></>
        )}
        {settings['visibleStats']['debuffs'] ? (
          <div className="stat-line">
            <span className="stat-label">Debuffs:</span>{' '}
            <span className="stat-value">{debuffs}</span>
          </div>
        ) : (
          <></>
        )}
        {settings['visibleStats']['tripleAttacks'] ? (
          <div className="stat-line">
            <span className="stat-label">TAs:</span>{' '}
            <span className="stat-value">
              {stats['tripleAttacks']}/{stats['normalAttacks']} (
              {tripleAttackRate}%)
            </span>
          </div>
        ) : (
          <></>
        )}
        {allStatsDisabled ? (
          <div className="empty-stats">
            No stats are enabled.
            <br />
            Enable stats in config to display something useful here.
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
