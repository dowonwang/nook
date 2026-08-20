import type { GetOrganization200 } from '@packages/api-client/api';

export async function getMyOrganizationList() {
  const response = await fetch('/api/organization', {
    method: 'GET',
  });

  if (response.ok) {
    const { data } = (await response.json()) as GetOrganization200;
    return data;
  }

  return [];
}
