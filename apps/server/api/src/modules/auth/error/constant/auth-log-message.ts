import type { AuthLogEventMessage } from '$modules/auth/error/constant/auth-log-event';

export const AUTH_LOG_MESSAGE: AuthLogEventMessage = {
  AUTH_INVAILD_ACCESS_TOKEN_CLAIMS: 'Required fields are missing or mismatched',
  AUTH_INVAILD_REFRESH_TOKEN_CLAIMS:
    'Required fields are missing or mismatched',
  AUTH_MISSING_JWT_TOKEN_SECRET:
    'Missing required environment variable: JWT_SECRET',
  AUTH_MISSING_JWT_TOKEN_EXPIRES:
    'Missing required environment variable: JWT_EXPIRES',
  AUTH_REFRESH_TOKEN_MALFORMED:
    'Invalid refresh token claim structure or missing required element. ',
  AUTH_SESSION_NOT_FOUND: 'Auth session not found for the given identifier',
} as const;
