/**
 * PokemonModal.tsx — Pokémon detail modal built on top of the generic Modal.
 *
 * Concerns handled HERE (Pokémon-specific):
 *   - Fetching detail data when a Pokémon id is selected
 *   - Rendering the header (sprite, name, id, types)
 *   - Tab bar (Stats / Moves / About) and tab content
 *   - Loading spinner and error state inside the panel
 *
 * Concerns delegated to <Modal> (generic shell):
 *   - Backdrop overlay + click-outside to close
 *   - Escape key to close
 *   - Body scroll lock
 *   - Framer-motion open/close animations
 *   - X close button
 */

import { useEffect, useState } from 'react';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { Modal } from '../common/Modal';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { PokemonTypeBadge } from '../common/PokemonTypeBadge';
import { StatsTab } from './tabs/StatsTab';
import { MovesTab } from './tabs/MovesTab';
import { AboutTab } from './tabs/AboutTab';
import type { ModalTab } from '../../utils/constants';
import { MODAL_TABS } from '../../utils/constants';
import styles from './PokemonModal.module.css';

interface PokemonModalProps {
  pokemonId: number | null;
  onClose: () => void;
}

export function PokemonModal({ pokemonId, onClose }: PokemonModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>('stats');
  const { detail, isLoading, error } = usePokemonDetail(pokemonId);

  // Reset to first tab whenever a different Pokémon is opened
  useEffect(() => {
    if (pokemonId !== null) setActiveTab('stats');
  }, [pokemonId]);

  return (
    <Modal isOpen={pokemonId !== null} onClose={onClose} maxWidth="480px">
      {/* Loading state */}
      {isLoading && (
        <div className={styles.loadingState}>
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Error state */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Content — only shown when data is ready */}
      {detail && !isLoading && (
        <>
          {/* ── Header: sprite + id + name + types ── */}
          <div className={styles.header}>
            <img
              src={detail.sprite}
              alt={detail.name}
              className={styles.sprite}
            />
            <div className={styles.meta}>
              <span className={styles.id}>
                #{String(detail.id).padStart(3, '0')}
              </span>
              <h2 className={styles.name}>{detail.name}</h2>
              <div className={styles.types}>
                {detail.types.map((t) => (
                  <PokemonTypeBadge key={t.name} type={t.name} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Tab bar ── */}
          <div className={styles.tabs} role="tablist">
            {MODAL_TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={[
                  styles.tab,
                  activeTab === tab ? styles.tabActive : '',
                ].join(' ')}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* ── Tab content ── */}
          <div className={styles.tabContent}>
            {activeTab === 'stats' && <StatsTab stats={detail.stats} />}
            {activeTab === 'moves' && <MovesTab moves={detail.moves} />}
            {activeTab === 'about' && <AboutTab detail={detail} />}
          </div>
        </>
      )}
    </Modal>
  );
}
