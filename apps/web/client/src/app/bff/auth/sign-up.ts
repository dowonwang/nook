import {
  postAuthSignUp,
  type PostAuthSignUpBody,
} from '@packages/api-client/api';
import { NextResponse } from 'next/server';

import {
  applyCookieEffect,
  bffWrapper,
  setFlashCookie,
} from '$shared/api/bff/index.server';

import type { I18N_RESPONSE_KEY } from '@packages/i18n/response';

type SuccessFlashMessage = Extract<
  I18N_RESPONSE_KEY,
  'auth_signup_success_signin_required'
>;

export async function handleSignUpRequest(
  request: Request,
): Promise<NextResponse> {
  const requestBody = (await request.json()) as PostAuthSignUpBody;

  const { result, cookieEffect } = await bffWrapper({
    request,
    authenticated: false,
    call: (headers) => postAuthSignUp(requestBody, { headers }),
  });

  const { data, status } = result;

  if (status === 201) {
    const message: SuccessFlashMessage = 'auth_signup_success_signin_required';

    const response = NextResponse.redirect(new URL('/signin', request.url), {
      status: 303,
    });

    setFlashCookie(response, message);

    return response;
  }

  return applyCookieEffect(
    NextResponse.json(data, {
      status,
    }),
    cookieEffect,
  );
}
