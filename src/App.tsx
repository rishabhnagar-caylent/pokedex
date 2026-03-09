/**
 * App.tsx — Application root and page router.
 *
 * Two views:
 *   'landing' — full-screen hero (LandingPage)
 *   'home'    — main Pokédex grid (HomePage)
 *
 * AnimatePresence handles the cross-fade exit animation when the user
 * clicks "Start Exploring" on the landing page.
 *
 * Providers wrap only the HomePage since TeamContext / ThemeContext
 * are not needed on the landing screen.
 */

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { TeamProvider } from './context/TeamContext';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';

type View = 'landing' | 'home';

function App() {
  const [view, setView] = useState<View>('landing');

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        <LandingPage key="landing" onStart={() => setView('home')} />
      ) : (
        <ThemeProvider key="home">
          <TeamProvider>
            <HomePage />
          </TeamProvider>
        </ThemeProvider>
      )}
    </AnimatePresence>
  );
}

export default App;
