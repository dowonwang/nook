import { headers } from 'next/headers';

import { SERVER_ENV_CONFIG } from '$shared/config/server';
import { getClientIp } from '$shared/lib/http';

import { BFF_REQUEST_HEADER } from './config/header';

export async function serverFetcher(
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

  requestHeaders.set(BFF_REQUEST_HEADER.name, BFF_REQUEST_HEADER.value);

  return fetch(`${SERVER_ENV_CONFIG.APP_BASE_URL}${url}`, {
    ...options,
    headers: requestHeaders,
    cache: 'no-store',
  });
}
