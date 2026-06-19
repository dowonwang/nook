import { type SignInActionState } from '$features/auth/sign-in/model';

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

  const response = await fetch('/api/auth/sign-in', {
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
    return {
      success: true,
      state: { email: '' },
      error: null,
    };
  }

  return {
    state: { email },
    error:
      (await response.json()) as postAuthSignInResponseError['data']['error'],
    success: false,
  };
}
