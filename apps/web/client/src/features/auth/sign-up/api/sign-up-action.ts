import { signUpSchema } from '$features/auth/sign-up/model/sign-up';
import { actionStateBuilder, createActionStateError } from '$shared/api/action';

import type {
  SignUpActionState,
  SignUpResponseError,
  SignUpState,
} from '$features/auth/sign-up/model/sign-up';
import type { postAuthSignUpResponseError } from '@packages/api-client/api';

export async function signUpAction(
  _previousState: SignUpActionState,
  formData: FormData,
): Promise<SignUpActionState> {
  const nameValue = formData.get('name');
  const emailValue = formData.get('email');
  const passwordValue = formData.get('password');

  const name = typeof nameValue === 'string' ? nameValue.trim() : '';
  const email = typeof emailValue === 'string' ? emailValue.trim() : '';
  const password =
    typeof passwordValue === 'string' ? passwordValue.trim() : '';

  const body = signUpSchema.safeParse({
    name,
    email,
    password,
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

  const response = await fetch('/api/auth/sign-up', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body.data),
  });

  if (response.ok) {
    return actionStateBuilder.success({
      email: '',
      name: '',
    });
  }

  return actionStateBuilder.error(
    { name, email },
    ((await response.json()) as postAuthSignUpResponseError['data']).error,
  );
}
