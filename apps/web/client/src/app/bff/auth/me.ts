import { getAuthMe } from '@packages/api-client/api';
import { NextResponse } from 'next/server';

import { getAuthAccessFromCookie } from '$shared/api/bff';

export async function handleMeRequest() {
  const accessToken = await getAuthAccessFromCookie();

  if (!accessToken) {
    return NextResponse.json('Unauthenticated', {
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
