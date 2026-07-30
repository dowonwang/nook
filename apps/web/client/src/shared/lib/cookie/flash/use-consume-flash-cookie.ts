'use client';

import { useEffect } from 'react';

export function useConsumeFlashCookie(shouldConsume: boolean): void {
  useEffect(() => {
    if (!shouldConsume) {
      return;
    }

    void fetch('/action/flash-token', {
      method: 'POST',
      credentials: 'same-origin',
    });
  }, []);
}
