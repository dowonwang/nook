import { BFF_REQUEST_HEADER } from './config/header';

// 브라우저에서 BFF(/api, /action)를 호출할 때 사용
export async function clientFetcher(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers);

  headers.set(BFF_REQUEST_HEADER.name, BFF_REQUEST_HEADER.value);

  return fetch(url, {
    ...options,
    headers,
    credentials: 'same-origin',
  });
}
