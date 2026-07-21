import { headers } from 'next/headers';

import { SERVER_ENV_CONFIG } from '$shared/config/server-env';

function getClientIp(headers: Headers): string | null {
  const forwardedFor = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');

  return forwardedFor?.split(',')[0]?.trim() || realIp || null;
}

export async function bffFetcher(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const incomingHeaders = await headers();
  const requestHeaders = new Headers(options.headers);

  const cookie = incomingHeaders.get('cookie');
  const userAgent = incomingHeaders.get('user-agent');
  const clientIp = getClientIp(incomingHeaders);

  if (cookie) {
    requestHeaders.set('cookie', cookie);
  } else {
    requestHeaders.delete('cookie');
  }

  if (clientIp) {
    requestHeaders.set('x-origin-client-ip', clientIp);
  }

  if (userAgent) {
    requestHeaders.set('x-origin-client-user-agent', userAgent);
  }

  return fetch(`${SERVER_ENV_CONFIG.APP_BASE_URL}${url}`, {
    ...options,
    headers: requestHeaders,
    cache: 'no-store',
  });
}
