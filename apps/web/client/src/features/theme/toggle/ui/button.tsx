'use client';

import { Button } from '@packages/ui/components/button';
import { Moon, Sun } from 'lucide-react';

import { applyTheme, useThemeContext } from '$shared/lib/theme';

import type { Theme } from '$shared/config';

export function ThemeToggleButton() {
  const { theme, setTheme } = useThemeContext();

  const onClick = () => {
    const value: Theme = theme === 'dark' ? 'light' : 'dark';

    applyTheme(value);
    setTheme(value);
  };

  return (
    <Button
      variant='secondary'
      size='icon'
      type='button'
      disabled={!theme}
      onClick={onClick}
      suppressHydrationWarning={true}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
