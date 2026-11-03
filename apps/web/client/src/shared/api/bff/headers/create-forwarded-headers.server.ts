import { SERVER_ENV_CONFIG } from '$shared/config/server';
import { getClientIp } from '$shared/lib/http';

const HEADER_ALLOW_LIST = ['content-type', 'authorization'] as const;

export function createForwardedHeaders(
  request?: Request,
  authorization?: string | null,
): Headers {
  if (!request) {
    return new Headers();
  }

  const clientIp =
    request.headers.get('x-origin-client-ip') || getClientIp(request);
  const userAgent =
    request.headers.get('x-origin-client-user-agent') ||
    request.headers.get('user-agent');

  const headers = new Headers();

  for (const key of HEADER_ALLOW_LIST) {
    const value = request.headers.get(key);

    if (value) {
      headers.set(key, value);
    }
  }

  headers.delete('host');
  headers.delete('content-length');

  if (clientIp) {
    headers.set('x-client-ip', clientIp);
  }

  if (userAgent) {
    headers.set('x-client-user-agent', userAgent);
  }

  // API 서버는 이 값이 있는 요청만 처리. 브라우저로는 전달되지 않음
  headers.set('x-internal-secret', SERVER_ENV_CONFIG.INTERNAL_API_SECRET);

  if (authorization && !headers.has('authorization')) {
    headers.set('authorization', `Bearer ${authorization}`);
  }

  return headers;
}
