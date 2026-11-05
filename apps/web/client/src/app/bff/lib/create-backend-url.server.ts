import { SERVER_ENV_CONFIG } from '$shared/config/server';

import type { NextRequest } from 'next/server';

const BACKEND_ORIGIN = new URL(SERVER_ENV_CONFIG.REST_API_BASE_URL).origin;

// BFF 경로를 백엔드 주소로 변환. 백엔드가 아닌 origin으로 해석되면 null
export function createBackendUrl(request: NextRequest): URL | null {
  const pathname = request.nextUrl.pathname.replace(/^\/api/, '');
  const destination = new URL(pathname, SERVER_ENV_CONFIG.REST_API_BASE_URL);

  // '//evil.com'처럼 다른 호스트로 해석되는 경로 차단. 지금은 Next가 경로를 정규화하지만 그 동작에 의존하지 않음
  if (destination.origin !== BACKEND_ORIGIN) {
    return null;
  }

  destination.search = request.nextUrl.search;

  return destination;
}
