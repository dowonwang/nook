import { BFF_REQUEST_HEADER } from '../config/header';

import type { NextRequest } from 'next/server';

// clientFetcher / serverFetcher로 보낸 요청인지 판별. 주소창 입력, 링크 이동은 제외
export function isBffRequest(request: NextRequest): boolean {
  const hasHeader =
    request.headers.get(BFF_REQUEST_HEADER.name) === BFF_REQUEST_HEADER.value;
  const isNavigation = request.headers.get('sec-fetch-mode') === 'navigate';

  return hasHeader && !isNavigation;
}
