import { Prisma } from '@packages/api-db';
import { FALLBACK_ERROR_KEY } from '@packages/i18n/response';
import { randomUUIDv7 } from 'bun';
import {
  Elysia,
  NotFoundError as ElysiaNotFoundError,
  ValidationError,
} from 'elysia';

import { AppError } from '$shared/error/app.error';
import {
  NotFoundError,
  UnprocessableContent,
} from '$shared/error/common.error';
import { getRouteLogScope } from '$shared/http/constants/route-log-scope';
import { PrismaErrorMapper } from '$shared/http/mapper/prisma-error-mapper';
import { VaildationErrorMapper } from '$shared/http/mapper/vaildation-error.mapper';
import { logger } from '$shared/logger';
import { LOG_EVENT } from '$shared/logger/constant/log-event';
import { LOG_MESSAGE } from '$shared/logger/constant/log-message';
import { ApiResponseBuilder } from '$shared/responses/api-response-builder';

export const errorPlugin = new Elysia().onError(
  { as: 'global' },
  ({ set, error, request, path }) => {
    const uuid = randomUUIDv7();
    const searchParams = Object.fromEntries(new URL(request.url).searchParams);

    if (error instanceof ValidationError) {
      const appError = VaildationErrorMapper(error);
      const scope = getRouteLogScope(path);

      set.status = appError.status;

      logger.error(
        {
          event: appError.event,
          requestId: uuid,
          method: request.method,
          path,
          searchParams,
          status: appError.status,
          details: appError.details,
          scope,
        },
        appError.message,
      );

      return ApiResponseBuilder.error({
        requestId: uuid,
        code: appError.code,
        details: appError.details,
      });
    }

    if (error instanceof AppError) {
      set.status = error.status;

      logger.error(
        {
          event: error.event,
          requestId: uuid,
          method: request.method,
          path,
          searchParams,
          status: error.status,
          details: error.details,
          scope: error.scope ?? 'APP',
        },
        error.message,
      );

      if (error instanceof UnprocessableContent) {
        return ApiResponseBuilder.error({
          requestId: uuid,
          code: error.code,
          details: error.details,
        });
      }

      return ApiResponseBuilder.error({
        code: error.code,
        requestId: uuid,
      });
    }

    if (error instanceof ElysiaNotFoundError) {
      const appError = new NotFoundError({
        detail: error.code,
        cause: error.cause,
      });

      set.status = appError.status;

      logger.error(
        {
          event: appError.event,
          requestId: uuid,
          method: request.method,
          path,
          searchParams,
          status: appError.status,
          details: appError.details,
          scope: 'HTTP',
        },
        appError.message,
      );

      return ApiResponseBuilder.error({
        requestId: uuid,
        code: appError.code,
        details: appError.details,
      });
    }

    const prismaError = PrismaErrorMapper(error);

    if (prismaError) {
      set.status = prismaError.status;

      if (
        error instanceof Prisma.PrismaClientRustPanicError ||
        error instanceof Prisma.PrismaClientInitializationError
      ) {
        logger.fatal(
          {
            event: prismaError.event,
            requestId: uuid,
            method: request.method,
            path,
            searchParams,
            status: prismaError.status,
            details: prismaError.details,
            scope: prismaError.scope ?? 'APP',
          },
          prismaError.message,
        );
      } else {
        logger.error(
          {
            event: prismaError.event,
            requestId: uuid,
            method: request.method,
            path,
            searchParams,
            status: prismaError.status,
            details: prismaError.details,
            scope: prismaError.scope ?? 'APP',
            err: prismaError.cause,
          },
          prismaError.message,
        );
      }

      return ApiResponseBuilder.error({
        requestId: uuid,
        code: prismaError.code,
      });
    }

    set.status = 500;

    logger.error(
      {
        event: LOG_EVENT.APP_ERROR_OCCURRED,
        requestId: uuid,
        method: request.method,
        path,
        searchParams,
        status: set.status,
        err: error,
      },
      // eslint-disable-next-line
      (error as any)?.message || LOG_MESSAGE.APP_ERROR_OCCURRED,
    );

    return ApiResponseBuilder.error({
      code: FALLBACK_ERROR_KEY,
      requestId: uuid,
    });
  },
);
