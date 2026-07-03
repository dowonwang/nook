import { getAuthAccessFromCookie } from '$shared/api/bff/cookies/auth-cookie';

export type BffHeaders = Record<string, string>;

const HEADER_ALLOW_LIST = ['content-type'] as const;

function pickAllowedHeaders(request: Request): BffHeaders {
  const headers: BffHeaders = {};

  for (const key of HEADER_ALLOW_LIST) {
    const value = request.headers.get(key);

    if (value) {
      headers[key] = value;
    }
  }

  return headers;
}

function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  return forwardedFor?.split(',')[0]?.trim() || realIp || null;
}

export function createForwardedHeaders(request?: Request): BffHeaders {
  if (!request) {
    return {};
  }

  const clientIp = getClientIp(request);
  const userAgent = request.headers.get('user-agent');

  const headers: BffHeaders = {};

  if (clientIp) {
    headers['x-client-ip'] = clientIp;
  }

  if (userAgent) {
    headers['x-client-user-agent'] = userAgent;
  }

  return headers;
}

export async function createBffHeaders(
  request: Request,
  options?: {
    authenticated?: boolean;
    accessToken?: string;
  },
): Promise<BffHeaders> {
  const headers: BffHeaders = {
    ...pickAllowedHeaders(request),
    ...createForwardedHeaders(request),
  };

  if (options?.authenticated) {
    if (options.accessToken) {
      headers['Authorization'] = `Bearer ${options.accessToken}`;
    } else {
      const accessToken = await getAuthAccessFromCookie();

      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
  }

  return headers;
}
