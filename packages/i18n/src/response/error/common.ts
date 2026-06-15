export const FALLBACK_ERROR_KEY = 'common.error.InternalServerError' as const;

export const COMMON_ERROR = [
  'common.error.BadRequestError',
  'common.error.UnauthorizedError',
  'common.error.ForbiddenError',
  'common.error.NotFoundError',
  'common.error.ConflictError',
  'common.error.UnprocessableContent',
  FALLBACK_ERROR_KEY,
] as const;

export type I18N_COMMON_ERROR_KEY = (typeof COMMON_ERROR)[number];
