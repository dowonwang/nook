import type { NextResponse } from 'next/server';

export function mergeResponseCookies(
  source: NextResponse,
  target: NextResponse,
): NextResponse {
  for (const cookie of source.cookies.getAll()) {
    target.cookies.set(cookie);
  }

  return target;
}
