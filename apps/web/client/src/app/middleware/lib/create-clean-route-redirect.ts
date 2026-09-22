import { NextResponse, type NextRequest } from 'next/server';

export function createCleanRouteRedirect(
  request: NextRequest,
  pathname: string,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;

  return NextResponse.redirect(url, 308);
}
