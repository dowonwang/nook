import type { TokenClaims } from '$modules/auth/domain';
import type { JWTPayload } from 'jose';

export interface TokenIssuer {
  issueToken(claims: TokenClaims): Promise<{
    token: string;
    payload: JWTPayload;
    expiresAt: Date | null;
  }>;
}
