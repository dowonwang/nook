import { isTokenExpired } from '$shared/lib/jwt';

import { SESSION_REFRESH_BEFORE_SECOND } from '../config/refresh';

export function shouldRefreshSession(accessToken: string | null): boolean {
  if (!accessToken) {
    return true;
  }

  return isTokenExpired(accessToken, {
    refreshBeforeSeconds: SESSION_REFRESH_BEFORE_SECOND,
  });
}
