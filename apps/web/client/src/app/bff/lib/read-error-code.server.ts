import { findErrorCode } from '$shared/api/error';

import type { NextResponse } from 'next/server';

// 에러 응답 본문에서 error.code를 읽음. JSON이 아니거나 해석할 수 없으면 null
export async function readErrorCode(
  response: NextResponse,
): Promise<string | null> {
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    return null;
  }

  try {
    return findErrorCode(await response.clone().json());
  } catch {
    return null;
  }
}
