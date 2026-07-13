export const FALLBACK_ERROR_KEY = 'common_error_InternalServerError' as const;

export const COMMON_ERROR = [
  'common_error_BadRequestError',
  'common_error_UnauthorizedError',
  'common_error_ForbiddenError',
  'common_error_NotFoundError',
  'common_error_ConflictError',
  'common_error_UnprocessableContent',
  FALLBACK_ERROR_KEY,
] as const;

export type I18N_COMMON_ERROR = (typeof COMMON_ERROR)[number];
