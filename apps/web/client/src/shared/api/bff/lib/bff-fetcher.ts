import { headers } from 'next/headers';

export async function bffFetcher(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const incomingHeaders = await headers();
  const requestHeaders = new Headers(options.headers);

  const cookie = incomingHeaders.get('cookie');

  if (cookie) {
    requestHeaders.set('cookie', cookie);
  } else {
    requestHeaders.delete('cookie');
  }

  return fetch(`http://localhost:3000${url}`, {
    ...options,
    headers: requestHeaders,
  });
}
