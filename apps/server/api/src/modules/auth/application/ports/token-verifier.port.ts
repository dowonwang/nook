import type {
  AccessTokenClaims,
  RefreshTokenClaims,
} from '$modules/auth/domain';

export interface TokenVerifier {
  verifyAccessToken(token: string): Promise<AccessTokenClaims>;
  verifyRefreshToken(token: string): Promise<RefreshTokenClaims>;
}
