import { UnauthorizedError } from '$shared/error';

export class JwtTokenExpired extends UnauthorizedError {
  constructor(scope: string) {
    super({
      scope,
      code: 'auth_error_token_expired',
    });
  }
}
