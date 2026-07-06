import type { I18N_AUTH_ERROR } from './error/auth';
import type { I18N_COMMON_ERROR_KEY } from './error/common';
import type { I18N_ORGANIZATION_ERROR } from './error/organization';
import type { I18N_USER_ERROR } from './error/user';

export { FALLBACK_ERROR_KEY } from './error/common';

export type I18N_RESPONSE_KEY =
  | I18N_COMMON_ERROR_KEY
  | I18N_USER_ERROR
  | I18N_ORGANIZATION_ERROR
  | I18N_AUTH_ERROR;
