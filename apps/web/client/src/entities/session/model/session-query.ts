import { queryOptions } from '@tanstack/react-query';

import { getSession } from '../api/get-session';
import { SESSION_QUERY_KEY } from '../config/query-key';

export const sessionQueryOptions = queryOptions({
  queryKey: SESSION_QUERY_KEY,
  queryFn: getSession,
});
