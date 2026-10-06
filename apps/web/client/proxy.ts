import { proxyMiddleware } from '$app/middleware/server';

import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  return proxyMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|\\.well-known).*)',
  ],
};
