import { queryOptions } from '@tanstack/react-query';

import { sessionQueryKey } from './session';
import { getServerSession } from '../api/get-session.server';

export const serverSessionQueryOptions = queryOptions({
  queryKey: sessionQueryKey,
  queryFn: getServerSession,
});
