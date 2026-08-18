export const LOG_EVENT = {
  HTTP_REQUEST_RECEIVED: 'http.request.received',
  HTTP_REQUEST_COMPLETED: 'http.request.completed',
  HTTP_REQUEST_FAILED: 'http.request.failed',

  HTTP_BAD_REQUEST: 'http.request_bad',
  HTTP_UNAUTHORIZED: 'http.unauthorized',
  HTTP_FORBIDDEN: 'http.forbidden',
  HTTP_NOT_FOUND: 'http.not_found',
  HTTP_CONFLICT: 'http.conflict',
  HTTP_UNPROCESSABLE_CONTENT: 'http.unprocessable_content',
  HTTP_INTERNAL_SERVER_ERROR: 'http.internal_server_error',

  HTTP_INVALID_REQUEST_IP: 'http.invalid_request_ip',
  HTTP_INVALID_REQUEST_USER_AGENT: 'http.invalid_request_user_agent',

  APP_START: 'app.start',
  APP_ERROR_OCCURRED: 'app.error.occurred',
  APP_UNHANDLED_EXCEPTION: 'app.unhandled.exception',

  PRISMA_CLIENT_KNOWN_REQUEST: 'prisma_client.known_request',
  PRISMA_CLIENT_UNKNOWN_REQUEST: 'prisma_client.unknown_request',
  PRISMA_CLIENT_RUST_PANIC: 'prisma_client.rust_panic',
  PRISMA_CLIENT_INITIALIZATION: 'prisma_client.initialization',
  PRISMA_CLIENT_VALIDATION: 'prisma_client.validation',

  DDD_INVALID_UUID_VO: 'ddd.invalid_uuid_vo',
} as const;

export type LogEventMessage = Record<keyof typeof LOG_EVENT, string>;
