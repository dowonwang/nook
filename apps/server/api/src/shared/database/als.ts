import { AsyncLocalStorage } from 'node:async_hooks';

import type { PrismaClient } from '@packages/api-db';

export type PrismaClientLike = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'
>;

export const asyncLocalStorage = new AsyncLocalStorage<PrismaClientLike>();

export function getClient(fallback: PrismaClient): PrismaClientLike {
  const tx = asyncLocalStorage.getStore();
  return tx ?? fallback;
}

// 앰비언트 트랜잭션이 있으면 참여하고, 없으면 새로 시작한다.
export async function runInTransaction<T>(
  prisma: PrismaClient,
  work: () => Promise<T>,
): Promise<T> {
  const currentTx = asyncLocalStorage.getStore();

  if (currentTx) {
    return work();
  }

  return prisma.$transaction(async (tx) => {
    return asyncLocalStorage.run(tx, work);
  });
}
