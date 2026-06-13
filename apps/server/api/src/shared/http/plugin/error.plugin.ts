import { Prisma } from '@packages/api-db';
import { randomUUIDv7 } from 'bun';
import {
  Elysia,
  NotFoundError as ElysiaNotFoundError,
  ValidationError,
} from 'elysia';

import { AppError } from '$shared/errors/app.error';
import {
  NotFoundError,
  UnprocessableContent,
} from '$shared/errors/common.erorr';
import { getRouteLogScope } from '$shared/http/constants/route-log-scope';
import { PrismaErrorMapper } from '$shared/http/mapper/prisma-error-mapper';
import { VaildationErrorMapper } from '$shared/http/mapper/vaildation-error.mapper';
import { logger } from '$shared/logger';
import { LOG_EVENT } from '$shared/logger/constant/log-event';
import { LOG_MESSAGE } from '$shared/logger/constant/log-message';
import { ApiResponseBuilder } from '$shared/responses/api-response-builder';

export const errorPlugin = new Elysia().onError(
  { as: 'scoped' },
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
        message: appError.userMessage,
        requestId: uuid,
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
          message: error.userMessage,
          details: error.details,
          requestId: uuid,
        });
      }

      return ApiResponseBuilder.error({
        message: error.userMessage,
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
        message: appError.userMessage,
        requestId: uuid,
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
        message: prismaError.userMessage,
        requestId: uuid,
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
      message: '일시적인 오류가 발생했습니다.',
      requestId: uuid,
    });
  },
);
