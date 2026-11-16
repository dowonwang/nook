export const PRISMA_ERROR_CODES = {
  RECORD_NOT_FOUND: 'P2025',
  UNIQUE_CONSTRAINT: 'P2002',
} as const satisfies Record<string, string>;
