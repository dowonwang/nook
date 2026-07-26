import { SERVER_ENV_CONFIG } from '$shared/config/server';

import type { NextRequest } from 'next/server';

export function createBackendUrl(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/^\/api/, '');
  const destination = new URL(pathname, SERVER_ENV_CONFIG.REST_API_BASE_URL);

  destination.search = request.nextUrl.search;

  return destination;
}
