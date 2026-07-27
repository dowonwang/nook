import { decodeJwtPayload } from './decode-jwt-payload';

import type { IsTokenExpiredOptions } from './jwt.types';

export function isTokenExpired(token: string, options?: IsTokenExpiredOptions) {
  const { refreshBeforeSeconds = 0, now = Date.now() } = options || {};

  const payload = decodeJwtPayload(token);

  if (typeof payload?.exp !== 'number') {
    return true;
  }

  const currentTimeSeconds = Math.floor(now / 1000);

  return payload.exp <= currentTimeSeconds + refreshBeforeSeconds;
}
