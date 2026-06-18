import { type SignInActionState } from '$features/auth/sign-in/model';

export async function signInAction(
  _previousState: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  const emailValue = formData.get('email');
  const passwordValue = formData.get('password');

  const email = typeof emailValue === 'string' ? emailValue.trim() : '';
  const password =
    typeof passwordValue === 'string' ? passwordValue.trim() : '';

  await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return {
    state: { email },
    error: null,
    success: true,
  };
}
