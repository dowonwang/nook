function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  return forwardedFor?.split(',')[0]?.trim() || realIp || null;
}

export function createForwardedHeaders(request?: Request): HeadersInit {
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
