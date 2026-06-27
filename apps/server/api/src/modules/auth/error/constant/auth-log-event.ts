export const AUTH_LOG_EVENT = {
  AUTH_INVAILD_ACCESS_TOKEN_CLAIMS: 'auth.invaild_access_token_claims',
  AUTH_INVAILD_REFRESH_TOKEN_CLAIMS: 'auth.invaild_refresh_token_claims',
  AUTH_MISSING_JWT_TOKEN_SECRET: 'auth.missing_jwt_token_secret',
  AUTH_MISSING_JWT_TOKEN_EXPIRES: 'auth.missing_jwt_token_expires',
  AUTH_REFRESH_TOKEN_MALFORMED: 'auth.refresh_token_malformed',
  AUTH_SESSION_NOT_FOUND: 'auth.session_not_found',
} as const;

export type AuthLogEventMessage = Record<keyof typeof AUTH_LOG_EVENT, string>;
