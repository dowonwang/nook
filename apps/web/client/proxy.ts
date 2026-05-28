import { NextResponse } from 'next/server';

import type { NextRequest, ProxyConfig } from 'next/server';

export function proxy(request: NextRequest) {
  console.log('proxy:', request.nextUrl.pathname);

  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: '/',
};
