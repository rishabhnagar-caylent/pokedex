/**
 * PokemonModal.tsx — Full-screen detail modal for a single Pokémon.
 *
 * Structure:
 *   ┌──────────────────────────────────────┐
 *   │  [X]  Sprite + Name + Types          │
 *   │  ──────────────────────────────────  │
 *   │  [ Stats ] [ Moves ] [ About ]  ←tabs│
 *   │  ──────────────────────────────────  │
 *   │  <tab content>                       │
 *   └──────────────────────────────────────┘
 *
 * Behaviours:
 *   - Clicking the backdrop (outside the panel) closes the modal.
 *   - Clicking the X button closes the modal.
 *   - While detail is loading, a spinner is shown inside the panel.
 *   - Body scroll is locked while the modal is open (via useEffect).
 *
 * Props:
 *   - pokemonId — the id to load; null means modal is closed.
 *   - onClose   — callback to clear the selected id in parent state.
 */

import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { TypeBadge } from '../common/TypeBadge';
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (pokemonId !== null) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [pokemonId]);

  // Reset tab when a new Pokémon is opened
  useEffect(() => {
    if (pokemonId !== null) setActiveTab('stats');
  }, [pokemonId]);

  // Don't render anything when closed
  if (pokemonId === null) return null;

  // Close only when clicking the backdrop itself (not children)
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal>
      <div className={styles.panel}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {isLoading && (
          <div className={styles.loadingState}>
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        {detail && !isLoading && (
          <>
            {/* Header: sprite + name + types */}
            <div className={styles.header}>
              <img
                src={detail.sprite}
                alt={detail.name}
                className={styles.sprite}
              />
              <div className={styles.meta}>
                <span className={styles.id}>#{String(detail.id).padStart(3, '0')}</span>
                <h2 className={styles.name}>{detail.name}</h2>
                <div className={styles.types}>
                  {detail.types.map((t) => (
                    <TypeBadge key={t.name} type={t} />
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs} role="tablist">
              {MODAL_TABS.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={[styles.tab, activeTab === tab ? styles.tabActive : ''].join(' ')}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className={styles.tabContent}>
              {activeTab === 'stats' && <StatsTab stats={detail.stats} />}
              {activeTab === 'moves' && <MovesTab moves={detail.moves} />}
              {activeTab === 'about' && <AboutTab detail={detail} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
