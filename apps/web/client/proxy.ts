import { handleRequest } from '$app/proxy';

import type { NextRequest, ProxyConfig } from 'next/server';

export function proxy(request: NextRequest) {
  return handleRequest(request);
}

export const config: ProxyConfig = {
  matcher: ['/api/:path*'],
};
