import { NextResponse } from 'next/server';

import { pickDownstreamHeaders } from '$shared/api/bff';

export async function toNextResponse<T>(
  response: Response,
): Promise<NextResponse<T>> {
  const headers = pickDownstreamHeaders(response.headers);
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return NextResponse.json(await response.json(), {
      status: response.status,
      headers,
    });
  }

  return new NextResponse(response.body, {
    status: response.status,
    headers,
  });
}
