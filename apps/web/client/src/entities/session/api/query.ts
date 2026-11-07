import { queryOptions } from '@tanstack/react-query';

import { getSession } from './get-session';
import { SESSION_QUERY_KEY } from './query-key';

export const sessionQueryOptions = queryOptions({
  queryKey: SESSION_QUERY_KEY,
  queryFn: getSession,
});
