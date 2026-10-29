export const LOG_EVENT = {
  HTTP_REQUEST_RECEIVED: 'http_request_received',
  HTTP_REQUEST_COMPLETED: 'http_request_completed',
  HTTP_REQUEST_FAILED: 'http_request_failed',

  HTTP_BAD_REQUEST: 'http_bad_request',
  HTTP_UNAUTHORIZED: 'http_unauthorized',
  HTTP_FORBIDDEN: 'http_forbidden',
  HTTP_NOT_FOUND: 'http_not_found',
  HTTP_CONFLICT: 'http_conflict',
  HTTP_UNPROCESSABLE_CONTENT: 'http_unprocessable_content',
  HTTP_INTERNAL_SERVER_ERROR: 'http_internal_server_error',

  HTTP_INVALID_REQUEST_IP: 'http_invalid_request_ip',
  HTTP_INVALID_REQUEST_USER_AGENT: 'http_invalid_request_user_agent',

  APP_START: 'app_start',
  APP_ERROR_OCCURRED: 'app_error_occurred',
  APP_UNHANDLED_EXCEPTION: 'app_unhandled_exception',

  PRISMA_CLIENT_KNOWN_REQUEST: 'prisma_client_known_request',
  PRISMA_CLIENT_UNKNOWN_REQUEST: 'prisma_client_unknown_request',
  PRISMA_CLIENT_RUST_PANIC: 'prisma_client_rust_panic',
  PRISMA_CLIENT_INITIALIZATION: 'prisma_client_initialization',
  PRISMA_CLIENT_VALIDATION: 'prisma_client_validation',

  DDD_INVALID_UUID_VO: 'ddd_invalid_uuid_vo',
} as const;

export type LogEventMessage = Record<keyof typeof LOG_EVENT, string>;
