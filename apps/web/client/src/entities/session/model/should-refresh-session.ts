import { isTokenExpired } from '$shared/lib/jwt';

import { SESSION_REFRESH_BEFORE_SECOND } from '../config/session-config';

export function shouldRefreshSession(accessToken: string | null): boolean {
  if (!accessToken) {
    return true;
  }

  return isTokenExpired(accessToken, {
    refreshBeforeSeconds: SESSION_REFRESH_BEFORE_SECOND,
  });
}
