import { getClient, runInTransaction } from './als';

import type { PrismaClient } from '@packages/api-db';
import type { PrismaClientLike } from './als';

export abstract class PrismaRepository {
  constructor(protected readonly prisma: PrismaClient) {}

  protected get client(): PrismaClientLike {
    return getClient(this.prisma);
  }

  protected transaction<T>(work: () => Promise<T>): Promise<T> {
    return runInTransaction(this.prisma, work);
  }
}
