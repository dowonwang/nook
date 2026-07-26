'use server';

import { redirect } from 'next/navigation';

import { actionStateBuilder, createActionStateError } from '$shared/api/action';
import { bffFetcher, setAuthCookie } from '$shared/api/bff/server';

import { signInSchema } from '../model/sign-in';

import type {
  SignInActionState,
  SignInResponseError,
  SignInResponseSuccess,
  SignInState,
} from '../model/sign-in';
import type { postAuthSignInResponseError } from '@packages/api-client/api';

export async function signInAction(
  _previousState: SignInActionState,
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
      },
      createActionStateError(body.error),
    );
  }

  const response = await bffFetcher('/api/auth/sign-in', {
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

    redirect('/');
  }

  return actionStateBuilder.error(
    { email },
    ((await response.json()) as postAuthSignInResponseError['data']).error,
  );
}
