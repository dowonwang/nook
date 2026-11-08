import { serverFetcher } from '$shared/api/bff/server';
import { getAuthAccessFromCookie } from '$shared/cookie/server';

import type { Session } from '../model/types';
import type { getUserMeResponseSuccess } from '@packages/api-client/api';

export async function getSessionServer(): Promise<Session> {
  const accessToken = await getAuthAccessFromCookie();

  if (!accessToken) {
    return {
      authenticated: false,
      user: null,
    };
  }

  const response = await serverFetcher('/api/user/me', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.ok) {
    const { data } =
      (await response.json()) as getUserMeResponseSuccess['data'];

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
