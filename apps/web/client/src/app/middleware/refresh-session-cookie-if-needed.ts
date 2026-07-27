import { refreshSession } from '$entities/session/server';
import { getAuthAccessFromCookie } from '$shared/api/bff/server';
import { isTokenExpired } from '$shared/lib/jwt';

import type { SessionTokens } from '$entities/session';
import type { NextRequest } from 'next/server';

export async function refreshSessionCookieIfNeeded(
  request: NextRequest,
): Promise<SessionTokens | null> {
  const accessToken = await getAuthAccessFromCookie();

  if (!accessToken) {
    return null;
  }

  const tokenExipred = isTokenExpired(accessToken, {
    refreshBeforeSeconds: 0,
  });

  if (!tokenExipred) {
    return null;
  }

  return await refreshSession(request);
}
