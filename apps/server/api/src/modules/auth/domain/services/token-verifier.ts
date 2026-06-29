import type { AccessTokenClaims } from '$modules/auth/domain/value-objects/access-token-claims.vo';
import type { RefreshTokenClaims } from '$modules/auth/domain/value-objects/refresh-token-claims.vo';

export interface TokenVerifier {
  verifyAccessToken(token: string): Promise<AccessTokenClaims>;
  verifyRefreshToken(token: string): Promise<RefreshTokenClaims>;
}
