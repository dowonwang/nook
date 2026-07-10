import { bffFetcher } from '$shared/api/bff/index.server';

import type { Session } from '$entities/session';
import type { getAuthMeResponseSuccess } from '@packages/api-client/api';

export async function getServerSession(): Promise<Session> {
  const response = await bffFetcher('/api/auth/me', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.ok) {
    const { data } =
      (await response.json()) as getAuthMeResponseSuccess['data'];

    return {
      authenticated: true,
      user: data,
    };
  }

  return {
    authenticated: false,
    user: null,
  };
}
