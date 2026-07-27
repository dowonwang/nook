import { queryOptions } from '@tanstack/react-query';

import { getSession } from '../api/get-session';
import { sessionQueryKey } from '../config/query-key';

export const sessionQueryOptions = queryOptions({
  queryKey: sessionQueryKey,
  queryFn: getSession,
});
