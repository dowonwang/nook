import { postAuthRefresh } from '@packages/api-client/api';
import { NextResponse } from 'next/server';

export async function handleRefresh() {
  const { data, status } = await postAuthRefresh();

  return NextResponse.json(data, {
    status,
  });
}
