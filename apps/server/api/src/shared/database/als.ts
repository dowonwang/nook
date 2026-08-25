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
