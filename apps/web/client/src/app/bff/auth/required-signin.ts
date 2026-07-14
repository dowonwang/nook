import { NextResponse } from 'next/server';

import { setFlashCookie } from '$shared/api/bff/index.server';

import type { I18N_RESPONSE_KEY } from '@packages/i18n/response';

type RequiredSignIn = Extract<I18N_RESPONSE_KEY, 'auth_required_signin'>;
const flashMessage: RequiredSignIn = 'auth_required_signin';

export function handleRequiredSignIn(request: Request) {
  const response = NextResponse.redirect(new URL('/signin', request.url), {
    status: 303,
  });

  setFlashCookie(response, flashMessage);

  return response;
}
