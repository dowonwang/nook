import { Elysia } from 'elysia';

import { UnauthorizedError } from '$shared/error';
import { ApiErrorResponseSchema } from '$shared/responses';

import type { TokenVerifier } from '$modules/auth/application';

interface AuthUser {
  id: string;
}

export type AuthGuard = ReturnType<typeof createAuthGuard>;

export function createAuthGuard(tokenVerifier: TokenVerifier) {
  const authGuard = new Elysia({ name: 'auth.guard' })
    .guard({
      response: {
        401: ApiErrorResponseSchema.meta({
          description: 'Access token verification failed.',
        }),
      },
    })
    .derive(async ({ headers }) => {
      const authorization = headers.authorization;

      if (!authorization) {
        throw new UnauthorizedError({
          scope: createAuthGuard.name,
        });
      }

      const [type, token, ...rest] = authorization.trim().split(/\s+/);

      if (type !== 'Bearer' || !token || rest.length > 0) {
        throw new UnauthorizedError({
          scope: createAuthGuard.name,
        });
      }

      const claims = await tokenVerifier.verifyAccessToken(token);
      const subject = claims.getSubject();

      if (!subject) {
        throw new UnauthorizedError({
          scope: createAuthGuard.name,
        });
      }

      return {
        authUser: {
          id: subject,
        } satisfies AuthUser,
      };
    })
    .as('scoped');

  return authGuard;
}
