'use client';

import { Button } from '@packages/ui/components/button';
import { Moon, Sun } from 'lucide-react';

import { applyTheme, getSystemTheme, useThemeContext } from '$shared/lib/theme';

import type { Theme } from '$shared/lib/theme';

export function ThemeToggleButton() {
  const { theme, setTheme } = useThemeContext();

  const onClick = () => {
    // 쿠키가 없으면 서버는 테마를 모르므로 클릭 시점의 시스템 설정으로 판단
    const currentTheme = theme ?? getSystemTheme();
    const value: Theme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(value);
    setTheme(value);
  };

  return (
    <Button variant='secondary' size='icon' type='button' onClick={onClick}>
      <Sun className='hidden dark:block' />
      <Moon className='dark:hidden' />
    </Button>
  );
}
