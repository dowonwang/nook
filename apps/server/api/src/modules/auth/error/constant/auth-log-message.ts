import type { AuthLogEventMessage } from './auth-log-event';

export const AUTH_LOG_MESSAGE: AuthLogEventMessage = {
  AUTH_INVALID_ACCESS_TOKEN_CLAIMS: 'Required fields are missing or mismatched',
  AUTH_INVALID_REFRESH_TOKEN_CLAIMS:
    'Required fields are missing or mismatched',
  AUTH_MISSING_JWT_TOKEN_SECRET:
    'Missing required environment variable: JWT_SECRET',
  AUTH_MISSING_JWT_TOKEN_EXPIRES:
    'Missing required environment variable: JWT_EXPIRES',
  AUTH_REFRESH_TOKEN_MALFORMED:
    'Invalid refresh token claim structure or missing required element. ',
  AUTH_SESSION_NOT_FOUND: 'Auth session not found for the given identifier',
  AUTH_REFRESH_TOKEN_REVOKED:
    'Authentication failed: The provided refresh token has already been revoked.',
  AUTH_REFRESH_TOKEN_EXPIRED: 'Refresh token has expired.',
  AUTH_REFRESH_TOKEN_REQUIRED:
    'Authentication failed: Refresh token is required in the Authorization header.',
  AUTH_TOKEN_HASH_SECRET:
    'Missing required environment variable: HASH_TOKEN_SECRET',
  AUTH_INVALID_CREDENTIALS: 'Invalid user credentials',
  AUTH_EMAIL_ALREADY_EXIST: 'User with this email already exists',
} as const;
