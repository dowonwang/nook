import type { TokenClaimsVo } from '$modules/auth/domain';
import type { JWTPayload } from 'jose';

export interface TokenIssuerPort {
  issueToken(claims: TokenClaimsVo): Promise<{
    token: string;
    payload: JWTPayload;
    expiresAt: Date | null;
  }>;
}
