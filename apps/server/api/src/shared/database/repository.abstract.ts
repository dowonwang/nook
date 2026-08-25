import { getClient } from './als';

import type { PrismaClientLike } from './als';
import type { PrismaClient } from '@packages/api-db';

export abstract class PrismaRepository {
  constructor(protected readonly prisma: PrismaClient) {}

  protected get client(): PrismaClientLike {
    return getClient(this.prisma);
  }
}
