/**
 * Navbar.tsx — Top navigation bar.
 *
 * Contains:
 *   - App logo / title on the left.
 *   - Theme toggle button (dark/light mode) on the right.
 *   - "Battle Team" button with a badge showing current team size.
 *     Clicking it opens the TeamDrawer.
 *
 * Props:
 *   - teamCount    — passed from HomePage so the badge stays in sync.
 *   - onTeamClick  — callback to open the TeamDrawer.
 */

import { useTheme } from '../../../context/ThemeContext';
import { Button } from '../Button';
import styles from './Navbar.module.css';

interface NavbarProps {
  teamCount: number;
  onTeamClick: () => void;
}

export function Navbar({ teamCount, onTeamClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        {/* Pokédex logo / title — replace with SVG asset from Figma */}
        <span className={styles.logoText}>Pocket Pokédex</span>
      </div>

      <div className={styles.actions}>
        {/* Theme toggle — icon TBD from Figma assets */}
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Battle Team button — badge variant shows count when team has members */}
        <Button
          variant={teamCount > 0 ? 'secondary' : 'primary'}
          badge={teamCount > 0 ? teamCount : undefined}
          onClick={onTeamClick}
        >
          Battle Team
        </Button>
      </div>
    </header>
  );
}
