import { queryOptions } from '@tanstack/react-query';

import { getSession } from '$entities/session/api/get-session';

export const sessionQueryKey = ['session'] as const;

export const sessionQueryOptions = queryOptions({
  queryKey: sessionQueryKey,
  queryFn: getSession,
  staleTime: 1000 * 60,
  retry: false,
});
