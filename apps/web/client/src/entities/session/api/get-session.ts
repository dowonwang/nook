import type { Session } from '$entities/session';
import type { getAuthMeResponseSuccess } from '@packages/api-client/api';

export async function getSession(): Promise<Session> {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
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
