import { createBackendUrl } from '$app/proxy/lib/create-backend-url';
import { createForwardedHeaders } from '$shared/api/bff/server';

import type { NextRequest } from 'next/server';

export async function requestBackend(
  request: NextRequest,
  authorization?: string | null,
): Promise<Response> {
  const destination = createBackendUrl(request);

  const headers = createForwardedHeaders(request, authorization);
  const hasBody = !['GET', 'HEAD'].includes(request.method);

  return fetch(destination, {
    method: request.method,
    headers: headers,
    body: hasBody ? await request.clone().arrayBuffer() : undefined,
    cache: 'no-store',
  });
}
