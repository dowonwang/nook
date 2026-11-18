import { Prisma } from '@packages/api-db';

import { PRISMA_ERROR_CODES } from '$shared/database';
import { LOG_EVENT, LOG_MESSAGE } from '$shared/logger';

import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from '$shared/error';

import type { AppError } from '$shared/error';

const SCOPE = 'PRISMA' as const;

export function mapPrismaError(error: unknown): AppError | null {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
      return new NotFoundError({
        scope: SCOPE,
        event: LOG_EVENT.PRISMA_RECORD_NOT_FOUND,
        message: LOG_MESSAGE.PRISMA_RECORD_NOT_FOUND,
        detail: error.code,
        cause: error.message,
      });
    }

    return new ConflictError({
      scope: SCOPE,
      event: LOG_EVENT.PRISMA_CLIENT_KNOWN_REQUEST,
      message: LOG_MESSAGE.PRISMA_CLIENT_KNOWN_REQUEST,
      detail: error.code,
      cause: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return new InternalServerError({
      scope: SCOPE,
      event: LOG_EVENT.PRISMA_CLIENT_UNKNOWN_REQUEST,
      message: LOG_MESSAGE.PRISMA_CLIENT_UNKNOWN_REQUEST,
      cause: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return new InternalServerError({
      scope: SCOPE,
      event: LOG_EVENT.PRISMA_CLIENT_RUST_PANIC,
      message: LOG_MESSAGE.PRISMA_CLIENT_RUST_PANIC,
      cause: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new InternalServerError({
      scope: SCOPE,
      event: LOG_EVENT.PRISMA_CLIENT_INITIALIZATION,
      message: LOG_MESSAGE.PRISMA_CLIENT_INITIALIZATION,
      cause: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new BadRequestError({
      scope: SCOPE,
      event: LOG_EVENT.PRISMA_CLIENT_VALIDATION,
      message: LOG_MESSAGE.PRISMA_CLIENT_VALIDATION,
      cause: error.message,
    });
  }

  return null;
}
