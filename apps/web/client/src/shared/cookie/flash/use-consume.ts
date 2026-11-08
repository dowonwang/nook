'use client';

import { useEffect } from 'react';

import { clientFetcher } from '$shared/api/bff';

export function useConsumeFlashCookie(shouldConsume: boolean): void {
  useEffect(() => {
    if (!shouldConsume) {
      return;
    }

    void clientFetcher('/action/flash-token', {
      method: 'POST',
    });
  }, [shouldConsume]);
}
