import { LOG_EVENT } from '$shared/logger/constant/log-event';
import { LOG_MESSAGE } from '$shared/logger/constant/log-message';

import { AppError } from './app.error';

import type { I18N_RESPONSE_KEY } from '@packages/i18n/response';

interface CommonErrorOptions {
  event?: string;
  message?: string;
  code?: I18N_RESPONSE_KEY;
  scope?: string;
  detail?: unknown;
  cause?: unknown;
}

export class BadRequestError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 400,
      event: options.event ?? LOG_EVENT.HTTP_BAD_REQUEST,
      message: options.message ?? LOG_MESSAGE.HTTP_BAD_REQUEST,
      code: options.code ?? 'common_error_BadRequestError',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 401,
      event: options.event ?? LOG_EVENT.HTTP_UNAUTHORIZED,
      message: options.message ?? LOG_MESSAGE.HTTP_UNAUTHORIZED,
      code: options.code ?? 'common_error_UnauthorizedError',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 403,
      event: options.event ?? LOG_EVENT.HTTP_FORBIDDEN,
      message: options.message ?? LOG_MESSAGE.HTTP_FORBIDDEN,
      code: options.code ?? 'common_error_ForbiddenError',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 404,
      event: options.event ?? LOG_EVENT.HTTP_NOT_FOUND,
      message: options.message ?? LOG_MESSAGE.HTTP_NOT_FOUND,
      code: options.code ?? 'common_error_NotFoundError',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class ConflictError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 409,
      event: options.event ?? LOG_EVENT.HTTP_CONFLICT,
      message: options.message ?? LOG_MESSAGE.HTTP_CONFLICT,
      code: options.code ?? 'common_error_ConflictError',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class UnprocessableContent extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 422,
      event: options.event ?? LOG_EVENT.HTTP_UNPROCESSABLE_CONTENT,
      message: options.message ?? LOG_MESSAGE.HTTP_UNPROCESSABLE_CONTENT,
      code: options.code ?? 'common_error_UnprocessableContent',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 500,
      event: options.event ?? LOG_EVENT.HTTP_INTERNAL_SERVER_ERROR,
      message: options.message ?? LOG_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
      code: options.code ?? 'common_error_InternalServerError',
      details: options.detail,
      cause: options.cause,
      scope: options.scope,
    });
  }
}
