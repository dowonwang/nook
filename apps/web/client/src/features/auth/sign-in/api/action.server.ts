'use server';

import { redirect } from 'next/navigation';

import { actionStateBuilder, createActionStateError } from '$shared/api/action';
import { serverFetcher } from '$shared/api/bff/server';
import { setAuthCookie } from '$shared/cookie/server';
import { getSafeRedirectPath } from '$shared/lib/http/server';

import { signInSchema } from '../model/types';

import type {
  SignInActionState,
  SignInResponseError,
  SignInResponseSuccess,
  SignInState,
} from '../model/types';
import type { postAuthSignInResponseError } from '@packages/api-client/api';

export async function signInServerAction(
  previousState: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  const emailValue = formData.get('email');
  const passwordValue = formData.get('password');

  const email = typeof emailValue === 'string' ? emailValue.trim() : '';
  const password =
    typeof passwordValue === 'string' ? passwordValue.trim() : '';

  const body = signInSchema.safeParse({ email, password });

  if (!body.success) {
    return actionStateBuilder.error<SignInState, SignInResponseError>(
      {
        email,
        'redirect-to': previousState.state['redirect-to'],
      },
      createActionStateError(body.error),
    );
  }

  const response = await serverFetcher('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const { data } = (await response.json()) as SignInResponseSuccess;
    await setAuthCookie(data.accessToken, data.refreshToken);

    // 이전 상태는 클라이언트가 조작할 수 있으므로 서버에서 다시 검증
    redirect(getSafeRedirectPath(previousState.state['redirect-to']));
  }

  return actionStateBuilder.error(
    { email, 'redirect-to': previousState.state['redirect-to'] },
    ((await response.json()) as postAuthSignInResponseError['data']).error,
  );
}
