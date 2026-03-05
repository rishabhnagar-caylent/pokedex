/**
 * AboutTab.tsx — "About" tab inside the Pokémon detail modal.
 *
 * Displays species lore and physical information:
 *   - Flavor text (from pokemon-species endpoint)
 *   - Genus (e.g. "Seed Pokémon")
 *   - Height, Weight
 *   - Abilities
 *   - Base Experience
 */

import type { PokemonDetail } from '../../../types';
import { formatHeight, formatWeight } from '../../../utils/statHelpers';
import styles from './AboutTab.module.css';

interface AboutTabProps {
  detail: PokemonDetail;
}

export function AboutTab({ detail }: AboutTabProps) {
  return (
    <div className={styles.wrapper}>
      {/* Flavor text / lore */}
      {detail.flavorText && (
        <p className={styles.flavorText}>{detail.flavorText}</p>
      )}

      {/* Data table */}
      <dl className={styles.dataList}>
        {detail.genus && (
          <>
            <dt>Species</dt>
            <dd>{detail.genus}</dd>
          </>
        )}

        <dt>Height</dt>
        <dd>{formatHeight(detail.height)}</dd>

        <dt>Weight</dt>
        <dd>{formatWeight(detail.weight)}</dd>

        <dt>Abilities</dt>
        <dd>{detail.abilities.map((a) => a.replace(/-/g, ' ')).join(', ')}</dd>

        {detail.baseExperience !== null && (
          <>
            <dt>Base Exp.</dt>
            <dd>{detail.baseExperience}</dd>
          </>
        )}
      </dl>
    </div>
  );
}
