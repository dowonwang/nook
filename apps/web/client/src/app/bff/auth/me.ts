import { getAuthMe } from '@packages/api-client/api';
import { NextResponse } from 'next/server';

import { getAuthTokenFromCookie } from '$shared/api/bff';

export async function handleMeRequest() {
  const accessToken = await getAuthTokenFromCookie();

  if (!accessToken) {
    return NextResponse.json('Auth', {
      status: 401,
    });
  }

  const { data, status } = await getAuthMe({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return NextResponse.json(data, {
    status,
  });
}
