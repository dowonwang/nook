'use client';

import { createContext, useContext, useState } from 'react';

import type { Theme } from '$shared/config';

interface Context {
  theme: Theme;
  setTheme: (value: Theme) => void;
}

interface Props {
  initTheme: Theme;
  children: React.ReactNode;
}

const ThemeContext = createContext<Context | null>(null);

export function ThemeProvider({ children, initTheme }: Props) {
  const [theme, setTheme] = useState<Theme>(initTheme);

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
