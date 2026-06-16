import type { AuthLogEventMessage } from '$modules/auth/error/constant/auth-log-event';

export const AUTH_LOG_MESSAGE: AuthLogEventMessage = {
  AUTH_INVAILD_ACCESS_TOKEN_CLAIMS: 'Required fields are missing or mismatched',
  AUTH_MISSING_JWT_TOKEN_SECRET:
    'Missing required environment variable: JWT_SECRET',
  AUTH_MISSING_JWT_TOKEN_EXPIRES:
    'Missing required environment variable: JWT_EXPIRES',
} as const;
