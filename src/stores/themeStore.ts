/**
 * Theme Store
 * A Zustand store that manages application theme state and operations.
 * Handles theme switching, persistence, and system preference detection.
 * 
 * Features:
 * - Light/dark theme management
 * - Theme persistence in localStorage
 * - System theme preference detection
 * - Theme toggle functionality
 * - Automatic theme initialization
 */

import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',
  
  setTheme: (theme: Theme) => {
    localStorage.setItem('feastly-theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    set({ theme });
  },
  
  toggleTheme: () => {
    const { theme, setTheme } = get();
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  },
  
  initTheme: () => {
    const savedTheme = localStorage.getItem('feastly-theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    set({ theme });
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
}));