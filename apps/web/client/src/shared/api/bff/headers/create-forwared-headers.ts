import { getClientIp } from './get-client-ip';

const HEADER_ALLOW_LIST = ['content-type'] as const;

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

  if (authorization) {
    headers.set('authorization', `Bearer ${authorization}`);
  }

  return headers;
}
