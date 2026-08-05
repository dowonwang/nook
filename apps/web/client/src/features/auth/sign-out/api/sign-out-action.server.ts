'use server';

import { redirect } from 'next/navigation';

import { bffFetcher } from '$shared/api/bff/server';
import {
  clearAuthCookie,
  getAuthRefreshFromCookie,
} from '$shared/lib/cookie/server';

export async function signOutAction() {
  const refreshToken = await getAuthRefreshFromCookie();

  if (refreshToken) {
    await bffFetcher('/api/auth/sign-out', {
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
