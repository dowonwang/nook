import { ZodError } from 'zod';

import {
  signInSchema,
  type SignInActionState,
  type SignInResponse,
} from '$features/auth/sign-in/model';
import { ApiValidationError, clientFetcher } from '$shared/api/client';
import { ValidationErrorCode } from '$shared/api/client/api-error';
import { createActionStateBuilder } from '$shared/lib/action-state';

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
    const parsed = signInSchema.parse({
      email,
      password,
    });

    await clientFetcher<SignInResponse>({
      path: '/api/auth',
      method: 'POST',
      body: parsed,
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

    if (error instanceof ZodError) {
      const errorField: Record<string, string> = {};

      error.issues.forEach((issue) => {
        const fieldName = issue.path.pop();

        if (fieldName) {
          errorField[fieldName.toString()] = issue.message;
        }
      });

      return createActionStateBuilder.error(
        {
          email,
        },
        {
          code: ValidationErrorCode,
          details: errorField,
        },
      );
    }

    return createActionStateBuilder.error({
      email,
    });
  }
}
