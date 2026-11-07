'use server';

import { redirect } from 'next/navigation';

import { serverFetcher } from '$shared/api/bff/server';
import {
  clearAuthCookie,
  getAuthRefreshFromCookie,
} from '$shared/lib/cookie/server';

export async function signOutServerAction() {
  const refreshToken = await getAuthRefreshFromCookie();

  if (refreshToken) {
    await serverFetcher('/api/auth/sign-out', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${refreshToken}`,
      },
    });
  }

  await clearAuthCookie();
  redirect('/');
}
