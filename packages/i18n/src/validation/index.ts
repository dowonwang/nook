import type { I18N_AUTH_VALIDATION_KEY } from './auth.ts';
import type { I18N_CUSTOM_VALIDATION_KEY } from './custom.ts';
import type { I18N_ORGANIZATION_VALIDATION_KEY } from './organization.ts';

export type I18N_VALIDATION_KEY =
  | I18N_CUSTOM_VALIDATION_KEY
  | I18N_AUTH_VALIDATION_KEY
  | I18N_ORGANIZATION_VALIDATION_KEY;

export type { I18N_CUSTOM_VALIDATION_KEY } from './custom.ts';
