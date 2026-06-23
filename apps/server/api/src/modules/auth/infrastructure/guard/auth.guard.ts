import { Elysia } from 'elysia';

import { UnauthorizedError } from '$shared/error/common.error';
import { ApiErrorResponseSchema } from '$shared/responses/api-response';

import type { JwtTokenVerifier } from '$modules/auth/infrastructure/services/jwt-token-verifier';

export interface AuthUser {
  id: string;
}

export function createAuthGuard(tokenVerifier: JwtTokenVerifier) {
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

      const [type, token] = authorization.split(' ');

      if (type !== 'Bearer' || !token) {
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
