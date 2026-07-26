'use server';

import { redirect } from 'next/navigation';

import { actionStateBuilder, createActionStateError } from '$shared/api/action';
import { bffFetcher, setFlashCookie } from '$shared/api/bff/server';

import { signUpSchema } from '../model/sign-up';

import type {
  SignUpResponseError,
  SignUpState,
  SignUpActionState,
} from '../model/sign-up';
import type { postAuthSignUpResponseError } from '@packages/api-client/api';

export async function signUpAction(
  _previousState: SignUpActionState,
  formData: FormData,
): Promise<SignUpActionState> {
  const nameValue = formData.get('name');
  const emailValue = formData.get('email');
  const passwordValue = formData.get('password');
  const confirmPasswordValue = formData.get('confirmPassword');

  const name = typeof nameValue === 'string' ? nameValue.trim() : '';
  const email = typeof emailValue === 'string' ? emailValue.trim() : '';
  const password =
    typeof passwordValue === 'string' ? passwordValue.trim() : '';
  const confirmPassword =
    typeof confirmPasswordValue === 'string' ? confirmPasswordValue.trim() : '';

  const body = signUpSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!body.success) {
    return actionStateBuilder.error<SignUpState, SignUpResponseError>(
      {
        name,
        email,
      },
      createActionStateError(body.error),
    );
  }

  const response = await bffFetcher('/api/auth/sign-up', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body.data),
  });

  if (response.ok) {
    await setFlashCookie('auth_signup_success_signin_required');
    redirect('/signin');
  }

  return actionStateBuilder.error(
    { name, email },
    ((await response.json()) as postAuthSignUpResponseError['data']).error,
  );
}
