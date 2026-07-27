import type { JwtPayload } from './jwt.types';

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.');

    if (!payload) {
      return null;
    }

    return JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf-8'),
    ) as JwtPayload;
  } catch {
    return null;
  }
}
