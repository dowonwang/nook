import { queryOptions } from '@tanstack/react-query';

import { getSession, sessionQueryKey } from '$entities/session';

export const sessionQueryOptions = queryOptions({
  queryKey: sessionQueryKey,
  queryFn: getSession,
});
