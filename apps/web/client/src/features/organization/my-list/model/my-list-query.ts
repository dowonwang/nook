import { queryOptions } from '@tanstack/react-query';

import { getMyOrganizationList } from '../api/get-my-list';
import { MY_ORGANIZATION_LIST_QUERY_KEY } from '../config/query-key';

export const myOrganizationListQueryOptions = queryOptions({
  queryKey: MY_ORGANIZATION_LIST_QUERY_KEY,
  queryFn: getMyOrganizationList,
});
