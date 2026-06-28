import type { LogEventMessage } from './log-event';

export const LOG_MESSAGE: LogEventMessage = {
  HTTP_REQUEST_RECEIVED: 'Request received',
  HTTP_REQUEST_COMPLETED: 'Request completed',
  HTTP_REQUEST_FAILED: 'Request failed',

  HTTP_BAD_REQUEST: 'Bad request',
  HTTP_UNAUTHORIZED: 'Unauthorized',
  HTTP_FORBIDDEN: 'Forbidden',
  HTTP_NOT_FOUND: 'Resource not found',
  HTTP_CONFLICT: 'Resource conflict',
  HTTP_UNPROCESSABLE_CONTENT: 'Unprocessable Content',
  HTTP_INTERNAL_SERVER_ERROR: 'Internal server error',

  HTTP_INVALID_REQUEST_IP: 'Client IP could not be verified',
  HTTP_INVALID_REQUEST_USER_AGENT: 'Client UserAgent could not be verified',

  APP_START: 'REST API server is running at',
  APP_ERROR_OCCURRED: 'Application error occured',
  APP_UNHANDLED_EXCEPTION: 'Unhandled exception occurred',

  PRISMA_CLIENT_INITIALIZATION: 'Prisma Client Initialization Error',
  PRISMA_CLIENT_KNOWN_REQUEST: 'Prisma Client Known Request Error',
  PRISMA_CLIENT_UNKNOWN_REQUEST: 'Prisma Client Unknown Request Error',
  PRISMA_CLIENT_VALIDATION: 'Prisma Client Vaildation Error',
  PRISMA_CLINET_RUST_PANIC: 'Prisma Client Rust Panic Error',

  DDD_INVALID_UUID_VO: 'Invalid uuid VO',
} as const;
