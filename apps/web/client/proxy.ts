import { proxyMiddleware } from '$app/middleware/server';

import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  return proxyMiddleware(request);
}

export const config = {
  // api(BFF)와 action은 locale 경로가 없는 Route Handler라 locale redirect·세션 처리에서 제외
  // Route Handler는 하위 경로에만 있으므로 하위 경로만 제외. /api, /apis, /actionable 등은 미들웨어를 거침
  matcher: [
    '/((?!(?:api|action)/|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|\\.well-known).*)',
  ],
};
