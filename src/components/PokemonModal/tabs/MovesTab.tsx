/**
 * MovesTab.tsx — "Moves" tab inside the Pokémon detail modal.
 *
 * Shows the first 10 moves the Pokémon can learn, sorted by:
 *   1. Level-up moves first, ascending by level
 *   2. All other learn methods alphabetically
 *
 * Each row: move name · learn method badge · level (if level-up)
 */

import type { PokemonMove } from '../../../types';
import styles from './MovesTab.module.css';

interface MovesTabProps {
  moves: PokemonMove[];
}

const DISPLAY_COUNT = 10;

/** Human-readable learn method labels */
const METHOD_LABELS: Record<string, string> = {
  'level-up': 'Level Up',
  machine:    'TM/HM',
  tutor:      'Tutor',
  egg:        'Egg',
};

function methodLabel(method: string): string {
  return METHOD_LABELS[method] ?? method.replace(/-/g, ' ');
}

export function MovesTab({ moves }: MovesTabProps) {
  const sorted = [...moves].sort((a, b) => {
    if (a.learnMethod === 'level-up' && b.learnMethod !== 'level-up') return -1;
    if (a.learnMethod !== 'level-up' && b.learnMethod === 'level-up') return 1;
    if (a.learnMethod === 'level-up') return a.levelLearnedAt - b.levelLearnedAt;
    return a.name.localeCompare(b.name);
  });

  const displayed = sorted.slice(0, DISPLAY_COUNT);

  return (
    <div className={styles.wrapper}>
      {/* Column headers */}
      <div className={styles.header}>
        <span>Move</span>
        <span>Method</span>
        <span>Lv.</span>
      </div>

      {displayed.map((move, i) => (
        <div key={move.name} className={[styles.row, i % 2 === 0 ? styles.rowEven : ''].join(' ')}>
          <span className={styles.moveName}>
            {move.name.replace(/-/g, ' ')}
          </span>
          <span className={styles.method}>
            {methodLabel(move.learnMethod)}
          </span>
          <span className={styles.level}>
            {move.learnMethod === 'level-up' && move.levelLearnedAt > 0
              ? move.levelLearnedAt
              : '—'}
          </span>
        </div>
      ))}

      <p className={styles.note}>
        Showing {displayed.length} of {moves.length} moves
      </p>
    </div>
  );
}
