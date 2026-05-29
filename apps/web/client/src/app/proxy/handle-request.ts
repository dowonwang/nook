import { NextResponse } from 'next/server';

import {
  canHaveRequestBody,
  createCorsHeaders,
  isAllowedOrigin,
  isSupportedProxyMethod,
  resolveRequestContentType,
  shouldValidateCsrf,
  vaildateCsrfToken,
} from '$shared/api/proxy';

import type { NextRequest } from 'next/server';

export function handleRequest(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = createCorsHeaders(origin);

  if (!isAllowedOrigin(origin)) {
    return NextResponse.json(
      { message: 'CORS origin not allowed' },
      {
        status: 403,
        headers: corsHeaders,
      },
    );
  }

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (!isSupportedProxyMethod(request.method)) {
    return NextResponse.json(
      { message: 'Method not allowed' },
      {
        status: 405,
        headers: corsHeaders,
      },
    );
  }

  if (
    shouldValidateCsrf(request.method) &&
    !vaildateCsrfToken(request.headers)
  ) {
    return NextResponse.json(
      {
        message: 'Invalid CSRF token',
      },
      {
        status: 403,
        headers: corsHeaders,
      },
    );
  }

  if (canHaveRequestBody(request.method)) {
    const contentType = resolveRequestContentType(request.headers);

    if (contentType === null || contentType === 'none') {
      return NextResponse.json(
        { message: 'Unsupported media type' },
        { status: 415, headers: corsHeaders },
      );
    }
  }

  const response = NextResponse.next();

  for (const [key, value] of corsHeaders) {
    response.headers.set(key, value);
  }

  return response;
}
