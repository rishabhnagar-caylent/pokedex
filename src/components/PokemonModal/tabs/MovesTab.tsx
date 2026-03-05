/**
 * MovesTab.tsx — "Moves" tab inside the Pokémon detail modal.
 *
 * Shows a scrollable list of moves the Pokémon can learn.
 * Each row displays: move name, learn method, and level (if via level-up).
 *
 * The API can return 50+ moves; we list all of them in a scrollable container
 * rather than paginating, since the modal already handles scroll locking.
 */

import type { PokemonMove } from '../../../types';
import styles from './MovesTab.module.css';

interface MovesTabProps {
  moves: PokemonMove[];
}

export function MovesTab({ moves }: MovesTabProps) {
  // Sort: level-up moves first (by level), then all others alphabetically
  const sorted = [...moves].sort((a, b) => {
    if (a.learnMethod === 'level-up' && b.learnMethod !== 'level-up') return -1;
    if (a.learnMethod !== 'level-up' && b.learnMethod === 'level-up') return 1;
    if (a.learnMethod === 'level-up') return a.levelLearnedAt - b.levelLearnedAt;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>Move</span>
        <span>Method</span>
        <span>Level</span>
      </div>
      <div className={styles.list}>
        {sorted.map((move) => (
          <div key={move.name} className={styles.row}>
            <span className={styles.moveName}>{move.name.replace(/-/g, ' ')}</span>
            <span className={styles.method}>{move.learnMethod}</span>
            <span className={styles.level}>
              {move.learnMethod === 'level-up' ? move.levelLearnedAt : '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
