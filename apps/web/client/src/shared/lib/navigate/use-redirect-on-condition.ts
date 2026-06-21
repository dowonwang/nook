'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { APP_CONSTANT } from '$shared/config/constant';

import { getSafePath } from './get-safe-path';

interface Params {
  condition: boolean;
  path?: string;
  fallbackPath?: string;
  refresh?: boolean;
  replace?: boolean;
}

export function useRedirectOnCondition({
  condition,
  path,
  fallbackPath = '/',
  refresh = true,
  replace = false,
}: Params) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryRedirectTo = searchParams?.get(APP_CONSTANT.redirectQueryKey);

  useEffect(() => {
    console.log('check');

    if (!condition) {
      return;
    }

    const targetPath = getSafePath(path ?? queryRedirectTo, fallbackPath);

    if (replace) {
      router.replace(targetPath);
    }

    if (refresh) {
      router.refresh();
    }

    router.push(targetPath);
  }, [
    condition,
    path,
    fallbackPath,
    refresh,
    replace,
    router,
    queryRedirectTo,
  ]);
}
