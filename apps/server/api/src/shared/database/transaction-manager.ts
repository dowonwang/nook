import { asyncLocalStorage } from './als';

import type { PrismaClient } from '@packages/api-db';

export interface TransactionManager {
  run<T>(work: () => Promise<T>): Promise<T>;
}

export class PrismaTransactionManager implements TransactionManager {
  constructor(private readonly prisma: PrismaClient) {}

  async run<T>(work: () => Promise<T>): Promise<T> {
    const currentTx = asyncLocalStorage.getStore();

    if (currentTx) {
      return work();
    }

    return this.prisma.$transaction(async (tx) => {
      return asyncLocalStorage.run(tx, work);
    });
  }
}
