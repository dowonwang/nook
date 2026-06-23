import type { JWTPayload } from 'jose';

export abstract class TokenClaims {
  protected abstract readonly payload: JWTPayload;

  getSubject(): JWTPayload['sub'] {
    return this.payload.sub;
  }

  toPrimitives(): JWTPayload {
    return this.payload;
  }
}
