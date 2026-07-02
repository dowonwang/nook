import { ForbiddenError } from '$shared/error/common.error';
import { createLogger } from '$shared/logger';
import { LOG_EVENT } from '$shared/logger/constant/log-event';
import { LOG_MESSAGE } from '$shared/logger/constant/log-message';

export interface RequestMetadata {
  ipAddress: string;
  userAgent: string;
}

const logger = createLogger(getRequestMetadata.name);
const WHITE_LIST_USER_AGENT = ['bruno-runtime'];

export function getRequestMetadata(request: Request): RequestMetadata {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  // client BFF에서 전달한 클라이언트 IP
  const clientIp = request.headers.get('x-client-ip');
  const originUserAgent = request.headers.get('user-agent');
  // client BFF에서 전달한 클라이언트 user-agent
  const clientUserAgent = request.headers.get('x-client-user-agent');

  const ipAddress =
    forwardedFor?.split(',')[0]?.trim() || realIp || clientIp || null;
  const userAgent = clientUserAgent || originUserAgent || null;

  logger.debug(
    {
      details: {
        ipAddress,
        userAgent,
        headers: request.headers,
      },
    },
    'request metadata',
  );

  if (!userAgent) {
    throw new ForbiddenError({
      scope: getRequestMetadata.name,
      event: LOG_EVENT.HTTP_INVALID_REQUEST_USER_AGENT,
      message: LOG_MESSAGE.HTTP_INVALID_REQUEST_USER_AGENT,
    });
  }

  const isWhiteListUserAgent = WHITE_LIST_USER_AGENT.some((item) =>
    userAgent.startsWith(item),
  );

  if (
    !ipAddress &&
    !(isWhiteListUserAgent && process.env.NODE_ENV === 'development')
  ) {
    throw new ForbiddenError({
      scope: getRequestMetadata.name,
      event: LOG_EVENT.HTTP_INVALID_REQUEST_IP,
      message: LOG_MESSAGE.HTTP_INVALID_REQUEST_IP,
    });
  }

  return {
    ipAddress: ipAddress || '127.0.0.1',
    userAgent,
  };
}
