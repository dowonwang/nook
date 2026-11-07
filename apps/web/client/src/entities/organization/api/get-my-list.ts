import { clientFetcher } from '$shared/api/bff';
import { createSearchParams } from '$shared/lib/http';

import type { OffsetPaginationQuery } from '$shared/lib/pagination';
import type { GetOrganization200 } from '@packages/api-client/api';

export async function getMyOrganizationList(query?: OffsetPaginationQuery) {
  const searchParams = createSearchParams(query);

  const response = await clientFetcher(
    '/api/organization?' + searchParams.toString(),
    {
      method: 'GET',
    },
  );

  if (response.ok) {
    const { data, meta } = (await response.json()) as GetOrganization200;
    return { data, meta };
  }

  return { data: [], meta: undefined };
}
