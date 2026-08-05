import { Elysia } from 'elysia';

import { RefreshTokenRequired } from '$modules/auth/error';
import { UnauthorizedError } from '$shared/error';

const SCOPE = 'RefreshTokenPlugin' as const;

export const refreshTokenPlugin = new Elysia({
  name: 'refresh-token-plugin',
}).derive({ as: 'scoped' }, ({ headers }) => {
  const authorization = headers.authorization?.trim();

  if (!authorization) {
    throw new UnauthorizedError({
      scope: SCOPE,
    });
  }

  const [type, refreshToken, ...rest] = authorization.split(/\s+/);

  if (type !== 'Bearer' || !refreshToken || rest.length > 0) {
    throw new RefreshTokenRequired(SCOPE);
  }

  return {
    refreshToken,
  };
});
