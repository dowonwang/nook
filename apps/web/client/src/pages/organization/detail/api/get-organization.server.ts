import { bffFetcher } from '$shared/api/bff/server';

import type { UserOrganization } from '$entities/organization';
import type { GetOrganizationSlugBySlug200 } from '@packages/api-client/api';

// 조직이 없거나 소속되지 않은 경우 서버가 404를 주므로 null 반환
export async function getOrganizationBySlugServer(
  slug: string,
): Promise<UserOrganization | null> {
  const response = await bffFetcher(
    `/api/organization/slug/${encodeURIComponent(slug)}`,
    {
      method: 'GET',
    },
  );

  if (response.ok) {
    const { data } = (await response.json()) as GetOrganizationSlugBySlug200;

    return data;
  }

  return null;
}
