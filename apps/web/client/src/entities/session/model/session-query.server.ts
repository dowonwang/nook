import { queryOptions } from '@tanstack/react-query';

import { getServerSession } from '../api/get-session.server';
import { sessionQueryKey } from '../config/query-key';

export const serverSessionQueryOptions = queryOptions({
  queryKey: sessionQueryKey,
  queryFn: getServerSession,
});
