import { ApiValidationError, clientFetcher } from '$shared/api/client';

import type { SignInActionState } from '$features/auth/sign-in/model/sign-in';

export async function signInAction(
  _previousState: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  const emailValue = formData.get('email');
  const passwordValue = formData.get('password');

  const email = typeof emailValue === 'string' ? emailValue.trim() : '';
  const password =
    typeof passwordValue === 'string' ? passwordValue.trim() : '';

  try {
    await clientFetcher({
      path: '/api/auth',
      method: 'POST',
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      state: { email: '' },
      error: null,
    };
  } catch (error) {
    if (error instanceof ApiValidationError) {
      return {
        success: false,
        state: { email },
        error: error.details,
      };
    }

    return {
      state: { email },
      success: false,
      error: null,
    };
  }
}
