import type { TokenClaims } from '$modules/auth/domain/value-objects/abstract/token-claims.base';

export interface TokenIssuer {
  issueToken(claims: TokenClaims): Promise<string>;
}
