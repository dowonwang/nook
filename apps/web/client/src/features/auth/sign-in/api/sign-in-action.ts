import { signInSchema } from '$features/auth/sign-in/model';
import { actionStateBuilder, createActionStateError } from '$shared/api/action';

import type {
  SignInActionState,
  SignInResponseError,
  SignInState,
} from '$features/auth/sign-in/model';
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
    return actionStateBuilder.success({ email: '' });
  }

  return actionStateBuilder.error(
    { email },
    ((await response.json()) as postAuthSignInResponseError['data']).error,
  );
}
