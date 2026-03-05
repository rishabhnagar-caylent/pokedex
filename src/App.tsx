/**
 * App.tsx — Application root.
 *
 * Wraps the entire app in the required context providers:
 *   1. ThemeProvider  — makes theme state + toggleTheme available everywhere.
 *   2. TeamProvider   — makes team state + actions available everywhere.
 *
 * Providers are defined here rather than in main.tsx to keep main.tsx
 * minimal (just the ReactDOM.createRoot call).
 *
 * Currently renders a single page (HomePage). If routing is added later
 * (e.g. React Router), the router would be added here wrapping the pages.
 */

import { ThemeProvider } from './context/ThemeContext';
import { TeamProvider } from './context/TeamContext';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <TeamProvider>
        <HomePage />
      </TeamProvider>
    </ThemeProvider>
  );
}

export default App;
