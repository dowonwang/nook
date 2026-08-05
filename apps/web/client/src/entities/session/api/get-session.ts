import type { Session } from '$entities/session';
import type { GetAuthMe200 } from '@packages/api-client/api';

export async function getSession(): Promise<Session> {
  const response = await fetch('/api/user/me', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.ok) {
    const { data } = (await response.json()) as GetAuthMe200;

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
