export interface BffFetcherOptions extends RequestInit {
  request?: Request;
}

function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  return forwardedFor?.split(',')[0]?.trim() ?? realIp ?? null;
}

function createForwardedClientHeaders(request?: Request): HeadersInit {
  if (!request) {
    return {};
  }

  const clientIp = getClientIp(request);
  const userAgent = request.headers.get('user-agent');

  const headers: Record<string, string> = {};

  if (clientIp) {
    headers['x-client-ip'] = clientIp;
  }

  if (userAgent) {
    headers['x-user-agent'] = userAgent;
  }

  return headers;
}

export async function bffFetcher<TResponse>(
  url: string,
  options?: BffFetcherOptions,
): Promise<TResponse> {
  const { request, headers, ...requestInit } = options ?? {};

  const response = await fetch(url, {
    ...requestInit,
    headers: {
      ...createForwardedClientHeaders(request),
      ...headers,
    },
  });

  const body = [204, 205, 304].includes(response.status)
    ? null
    : await response.text();

  const data = body ? JSON.parse(body) : {};

  return {
    data,
    status: response.status,
    headers: response.headers,
  } as TResponse;
}
