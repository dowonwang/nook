import { NextResponse } from 'next/server';

import { createBackendUrl } from '$app/proxy/lib/create-backend-url';
import { createForwardedHeaders } from '$shared/api/bff/server';

import type { NextRequest } from 'next/server';

export async function requestBackend(
  request: NextRequest,
  authorization?: string | null,
): Promise<NextResponse> {
  const destination = createBackendUrl(request);

  const headers = createForwardedHeaders(request, authorization);
  const hasBody = !['GET', 'HEAD'].includes(request.method);

  const response = await fetch(destination, {
    method: request.method,
    headers: headers,
    body: hasBody ? await request.clone().arrayBuffer() : undefined,
    cache: 'no-store',
  });

  const newHeaders = new Headers(response.headers);

  newHeaders.delete('content-encoding');
  newHeaders.delete('content-length');

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
