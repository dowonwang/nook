import { queryOptions } from '@tanstack/react-query';

import { getSessionServer } from './get-session.server';
import { SESSION_QUERY_KEY } from './query-key';

export const serverSessionQueryOptions = queryOptions({
  queryKey: SESSION_QUERY_KEY,
  queryFn: getSessionServer,
});
