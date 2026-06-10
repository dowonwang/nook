import { authValidationKo } from './validation/auth';

export const i18nKo = {
  ...authValidationKo,
} satisfies Record<string, string>;

export type I18nKoKey = keyof typeof i18nKo;
