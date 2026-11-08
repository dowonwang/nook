import { NextResponse } from 'next/server';

import { createForwardedHeaders } from '$shared/api/bff/server';

import { createBackendUrl } from '../lib/create-backend-url.server';
import { createBadGatewayResponse } from '../lib/create-bad-gateway-response.server';

import type { NextRequest } from 'next/server';

export async function requestBackend(
  request: NextRequest,
  authorization?: string | null,
): Promise<NextResponse> {
  const destination = createBackendUrl(request);

  if (!destination) {
    return new NextResponse(null, { status: 404 });
  }

  const headers = createForwardedHeaders(request, authorization);
  const hasBody = !['GET', 'HEAD'].includes(request.method);

  let response: Response;

  try {
    response = await fetch(destination, {
      method: request.method,
      headers: headers,
      body: hasBody ? await request.clone().arrayBuffer() : undefined,
      cache: 'no-store',
    });
  } catch {
    // 백엔드가 꺼져 있거나 연결이 끊긴 경우
    return createBadGatewayResponse();
  }

  const newHeaders = new Headers(response.headers);

  newHeaders.delete('content-encoding');
  newHeaders.delete('content-length');

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
