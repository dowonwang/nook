'use client';

import { useEffect, useState } from 'react';

type BreakPoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const BREAK_POINTS: Record<BreakPoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export function useBreakPoint(): {
  breakPoint: BreakPoint | null;
} {
  const [breakPoint, setBreakPoint] = useState<BreakPoint | null>(null);

  useEffect(() => {
    const getBreakPoint = (): BreakPoint => {
      const width = window.innerWidth;

      if (width >= BREAK_POINTS['2xl']) return '2xl';
      if (width >= BREAK_POINTS['xl']) return 'xl';
      if (width >= BREAK_POINTS['lg']) return 'lg';
      if (width >= BREAK_POINTS['md']) return 'md';
      if (width >= BREAK_POINTS['sm']) return 'sm';

      return 'sm';
    };

    const handleResize = () => {
      setBreakPoint(getBreakPoint());
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { breakPoint };
}
