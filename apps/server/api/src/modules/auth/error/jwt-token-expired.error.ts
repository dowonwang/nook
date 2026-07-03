import { UnauthorizedError } from '$shared/error/common.error';

export class JwtTokenExpired extends UnauthorizedError {
  constructor(scope: string) {
    super({
      scope,
      code: 'ACCESS_TOKEN_EXPIRED',
    });
  }
}
