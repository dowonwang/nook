import { runInTransaction } from './als';

import type { PrismaClient } from '@packages/api-db';

export interface TransactionManager {
  run<T>(work: () => Promise<T>): Promise<T>;
}

export class PrismaTransactionManager implements TransactionManager {
  constructor(private readonly prisma: PrismaClient) {}

  async run<T>(work: () => Promise<T>): Promise<T> {
    return runInTransaction(this.prisma, work);
  }
}
