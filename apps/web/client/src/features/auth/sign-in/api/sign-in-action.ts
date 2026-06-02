import { ApiValidationError, clientFetcher } from '$shared/api/client';
import { createActionStateBuilder } from '$shared/lib/action-state';

import type {
  SignInActionState,
  SignInResponse,
} from '$features/auth/sign-in/model';

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
    await clientFetcher<SignInResponse>({
      path: '/api/auth',
      method: 'POST',
      body: {
        email,
        password,
      },
    });

    return createActionStateBuilder.success({ email });
  } catch (error) {
    if (error instanceof ApiValidationError) {
      return createActionStateBuilder.error(
        {
          email,
        },
        {
          code: error.code,
          details: error.details,
        },
      );
    }

    return createActionStateBuilder.error({
      email,
    });
  }
}
