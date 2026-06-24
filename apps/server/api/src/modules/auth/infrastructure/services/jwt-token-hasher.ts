import { createHash } from 'node:crypto';

import type { TokenHasher } from '$modules/auth/domain/services/token-hasher';

export class JwtTokenHasher implements TokenHasher {
  create(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
