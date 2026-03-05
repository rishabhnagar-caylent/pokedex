/**
 * TypeFilter.tsx — Horizontal scrollable row of type filter chips.
 *
 * Renders one TypeBadge (in filter mode) per Pokémon type.
 * Clicking a chip sets it as the active filter; clicking again clears it.
 * An "All" chip at the start clears the active filter.
 *
 * Props:
 *   - types      — list of all PokemonType objects (from useTypeFilter)
 *   - activeType — currently selected type name, or null for "All"
 *   - onSelect   — callback fired when a chip is clicked
 */

import { TypeBadge } from '../common/TypeBadge';
import type { PokemonType } from '../../types';
import styles from './TypeFilter.module.css';

interface TypeFilterProps {
  types: PokemonType[];
  activeType: string | null;
  onSelect: (typeName: string | null) => void;
}

export function TypeFilter({ types, activeType, onSelect }: TypeFilterProps) {
  return (
    <div className={styles.wrapper} role="toolbar" aria-label="Filter by type">
      {/* "All" chip — deselects any active filter */}
      <button
        className={[styles.allChip, !activeType ? styles.allChipActive : ''].join(' ')}
        onClick={() => onSelect(null)}
      >
        All
      </button>

      {types.map((type) => (
        <TypeBadge
          key={type.name}
          type={type}
          asFilter
          isActive={activeType === type.name}
          onClick={() => onSelect(activeType === type.name ? null : type.name)}
        />
      ))}
    </div>
  );
}
