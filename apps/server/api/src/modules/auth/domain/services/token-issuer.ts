import type { TokenClaims } from '../value-objects/abstract/token-claims.base';
import type { JWTPayload } from 'jose';

export interface TokenIssuer {
  issueToken(claims: TokenClaims): Promise<{
    token: string;
    payload: JWTPayload;
    expiresAt: Date | null;
  }>;
}
