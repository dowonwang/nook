import { queryOptions } from '@tanstack/react-query';

import { sessionQueryKey } from './session';
import { getSession } from '../api/get-session';

export const sessionQueryOptions = queryOptions({
  queryKey: sessionQueryKey,
  queryFn: getSession,
});
