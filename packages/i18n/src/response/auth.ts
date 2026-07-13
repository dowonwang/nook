export const AUTH_RESPONSE = ['auth_signup_success_signin_required'] as const;

export type I18N_AUTH_RESPONSE = (typeof AUTH_RESPONSE)[number];
