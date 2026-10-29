export const AUTH_LOG_EVENT = {
  AUTH_INVALID_ACCESS_TOKEN_CLAIMS: 'auth_invalid_access_token_claims',
  AUTH_INVALID_REFRESH_TOKEN_CLAIMS: 'auth_invalid_refresh_token_claims',
  AUTH_MISSING_JWT_TOKEN_SECRET: 'auth_missing_jwt_token_secret',
  AUTH_MISSING_JWT_TOKEN_EXPIRES: 'auth_missing_jwt_token_expires',
  AUTH_REFRESH_TOKEN_MALFORMED: 'auth_refresh_token_malformed',
  AUTH_SESSION_NOT_FOUND: 'auth_session_not_found',
  AUTH_REFRESH_TOKEN_REVOKED: 'auth_refresh_token_revoked',
  AUTH_REFRESH_TOKEN_EXPIRED: 'auth_refresh_token_expired',
  AUTH_REFRESH_TOKEN_REQUIRED: 'auth_refresh_token_required',
  AUTH_TOKEN_HASH_SECRET: 'auth_token_hash_secret',
  AUTH_INVALID_CREDENTIALS: 'auth_invalid_credentials',
  AUTH_EMAIL_ALREADY_EXIST: 'auth_email_already_exist',
} as const;

export type AuthLogEventMessage = Record<keyof typeof AUTH_LOG_EVENT, string>;
