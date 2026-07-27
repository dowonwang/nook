import { refreshSession } from '$entities/session/server';
import { getAuthAccessFromCookie, setAuthCookie } from '$shared/api/bff/server';
import { isTokenExpired } from '$shared/lib/jwt';

import type { NextRequest } from 'next/server';

export async function checkSession(request: NextRequest) {
  const accessToken = await getAuthAccessFromCookie();
  console.log(accessToken);

  if (!accessToken) {
    return;
  }

  const tokenExipred = isTokenExpired(accessToken, {
    refreshBeforeSeconds: 30,
  });

  if (!tokenExipred) {
    return;
  }

  const result = await refreshSession(request);

  console.log('refresh');

  if (!result) {
    return;
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result;
  await setAuthCookie(newAccessToken, newRefreshToken);
}
