import { FALLBACK_ERROR_KEY } from '@packages/i18n/response';
import { NextResponse } from 'next/server';

// 백엔드에 연결하지 못했거나 응답을 해석할 수 없을 때 클라이언트에 돌려줄 응답
export function createBadGatewayResponse(): NextResponse {
  return NextResponse.json(
    {
      error: {
        code: FALLBACK_ERROR_KEY,
      },
    },
    {
      status: 502,
    },
  );
}
