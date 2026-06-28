import { ForbiddenError } from '$shared/error/common.error';
import { LOG_EVENT } from '$shared/logger/constant/log-event';
import { LOG_MESSAGE } from '$shared/logger/constant/log-message';

export interface RequestMetadata {
  ipAddress: string;
  userAgent: string;
}

const WHITE_LIST_USER_AGENT = ['bruno-runtime'];

export function getRequestMetadata(request: Request): RequestMetadata {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const userAgent = request.headers.get('user-agent');

  const ipAddress = forwardedFor?.split(',')[0]?.trim() || realIp || null;

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
