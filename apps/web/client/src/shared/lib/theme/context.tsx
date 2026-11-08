'use client';

import { createContext, useContext, useState } from 'react';

import type { Theme } from './types';

interface Context {
  theme: Theme | null;
  setTheme: (value: Theme) => void;
}

interface Props {
  initTheme: Theme | null;
  children: React.ReactNode;
}

const ThemeContext = createContext<Context | null>(null);

export function ThemeProvider({ children, initTheme }: Props) {
  const [theme, setTheme] = useState<Theme | null>(initTheme);

  return (
    <ThemeContext
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
}
