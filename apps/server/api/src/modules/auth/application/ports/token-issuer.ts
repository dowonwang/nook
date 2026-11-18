import type { JWTPayload } from 'jose';
import type { TokenClaimsVo } from '$modules/auth/domain';

export interface TokenIssuerPort {
  issueToken(claims: TokenClaimsVo): Promise<{
    token: string;
    payload: JWTPayload;
    expiresAt: Date | null;
  }>;
}
