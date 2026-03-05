/**
 * StatsTab.tsx — "Stats" tab inside the Pokémon detail modal.
 *
 * Renders each base stat as a labeled bar, showing:
 *   - Stat name (formatted, e.g. "Sp. Atk")
 *   - Numeric value
 *   - Filled progress bar proportional to MAX_BASE_STAT (255)
 */

import type { PokemonStat } from '../../../types';
import { formatStatName, statPercent } from '../../../utils/statHelpers';
import { STAT_ORDER } from '../../../utils/constants';
import styles from './StatsTab.module.css';

interface StatsTabProps {
  stats: PokemonStat[];
}

export function StatsTab({ stats }: StatsTabProps) {
  // Sort stats in the canonical order defined in constants
  const sorted = STAT_ORDER
    .map((name) => stats.find((s) => s.name === name))
    .filter(Boolean) as PokemonStat[];

  return (
    <div className={styles.wrapper}>
      {sorted.map((stat) => (
        <div key={stat.name} className={styles.row}>
          <span className={styles.label}>{formatStatName(stat.name)}</span>
          <span className={styles.value}>{stat.baseStat}</span>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{ width: `${statPercent(stat.baseStat)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
