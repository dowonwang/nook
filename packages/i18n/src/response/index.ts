import type { I18N_AUTH_ERROR_KEY } from './error/auth';
import type { I18N_COMMON_ERROR_KEY } from './error/common';

export type I18N_RESPONSE_KEY = I18N_COMMON_ERROR_KEY | I18N_AUTH_ERROR_KEY;
export { FALLBACK_ERROR_KEY } from './error/common';
