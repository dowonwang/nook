export const I18N_CUSTOM_VALIDATION = [
  'PostAuthSignUpBody_confirmPassword_mismatch',
  'test',
] as const;

export type I18N_CUSTOM_VALIDATION_KEY =
  (typeof I18N_CUSTOM_VALIDATION)[number];
