import { queryOptions } from '@tanstack/react-query';

import { getServerSession } from '../api/get-session.server';
import { SESSION_QUERY_KEY } from '../config/query-key';

export const serverSessionQueryOptions = queryOptions({
  queryKey: SESSION_QUERY_KEY,
  queryFn: getServerSession,
});
