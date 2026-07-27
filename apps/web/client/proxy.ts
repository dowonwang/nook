import { checkSession } from '$app/middleware';

import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  await checkSession(request);
}

export const config = {
  matcher: '/',
};
