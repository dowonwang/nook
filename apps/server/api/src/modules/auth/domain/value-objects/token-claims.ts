import type { JWTPayload } from 'jose';

export abstract class TokenClaimsVo {
  protected abstract readonly payload: JWTPayload;

  getSubject(): JWTPayload['sub'] {
    return this.payload.sub;
  }

  getJti(): JWTPayload['jti'] {
    return this.payload.jti;
  }

  getExp(): JWTPayload['exp'] {
    return this.payload.exp;
  }

  toPrimitives(): JWTPayload {
    return this.payload;
  }
}
