export const AUTH_LOG_EVENT = {
  AUTH_INVALID_ACCESS_TOKEN_CLAIMS: 'auth.invalid_access_token_claims',
  AUTH_INVALID_REFRESH_TOKEN_CLAIMS: 'auth.invalid_refresh_token_claims',
  AUTH_MISSING_JWT_TOKEN_SECRET: 'auth.missing_jwt_token_secret',
  AUTH_MISSING_JWT_TOKEN_EXPIRES: 'auth.missing_jwt_token_expires',
  AUTH_REFRESH_TOKEN_MALFORMED: 'auth.refresh_token_malformed',
  AUTH_SESSION_NOT_FOUND: 'auth.session_not_found',
  AUTH_REFRESH_TOKEN_REVOKED: 'auth.refresh_token_revoked',
  AUTH_REFRESH_TOKEN_EXPIRED: 'auth.refresh_token_expired',
  AUTH_REFRESH_TOKEN_REQUIRED: 'auth.refresh_token_required',
  AUTH_TOKEN_HASH_SECRET: 'auth.token_hash_secret',
} as const;

export type AuthLogEventMessage = Record<keyof typeof AUTH_LOG_EVENT, string>;
