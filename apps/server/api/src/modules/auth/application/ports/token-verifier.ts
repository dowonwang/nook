import type {
  AccessTokenClaimsVo,
  RefreshTokenClaimsVo,
} from '$modules/auth/domain';

export interface TokenVerifierPort {
  verifyAccessToken(token: string): Promise<AccessTokenClaimsVo>;
  verifyRefreshToken(token: string): Promise<RefreshTokenClaimsVo>;
}
