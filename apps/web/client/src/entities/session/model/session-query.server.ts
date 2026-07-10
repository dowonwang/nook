import { queryOptions } from '@tanstack/react-query';

import { sessionQueryKey } from '$entities/session';
import { getServerSession } from '$entities/session/index.server';

export const serverSessionQueryOptions = queryOptions({
  queryKey: sessionQueryKey,
  queryFn: getServerSession,
});
