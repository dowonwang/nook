import { pickUpstreamHeaders } from '$shared/api/bff/headers';
import { SERVER_ENV_CONFIG } from '$shared/config';

type BffBody =
  | { type: 'json'; value: unknown }
  | { type: 'multipart'; value: unknown }
  | { type: 'none' };

interface BffFetcherInput {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  requestHeaders: Headers;
  body?: BffBody;
}

export async function bffFetcher(input: BffFetcherInput) {
  const headers = pickUpstreamHeaders(input.requestHeaders);

  let body: BodyInit | undefined;

  if (input.body?.type === 'json') {
    headers.set('content-type', 'application/json');
    body = JSON.stringify(input.body.value);
  }

  if (input.body?.type === 'multipart') {
    headers.delete('content-type');
    body = input.body.value as BodyInit;
  }

  const response = await fetch(
    `${SERVER_ENV_CONFIG.API_BASE_URL}${input.path}`,
    {
      method: input.method ?? 'GET',
      headers,
      body,
      cache: 'no-store',
    },
  );

  if (process.env.NODE_ENV === 'development') {
    console.log('[Request headers]: ', headers);
  }

  return response;
}
