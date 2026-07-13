import { PostAuthSignUpBody } from '@packages/api-client/schema/auth';
import { z } from 'zod';

import type { ActionState } from '$shared/api/action';
import type { postAuthSignUpResponseError } from '@packages/api-client/api';
import type { I18N_CUSTOM_VALIDATION_KEY } from '@packages/i18n/validation';

type SignUpPayload = z.infer<typeof signUpSchema>;
type ConfirmPasswordError = Extract<
  I18N_CUSTOM_VALIDATION_KEY,
  'PostAuthSignUpBody_confirmPassword_mismatch'
>;

const confirmPasswordError: ConfirmPasswordError =
  'PostAuthSignUpBody_confirmPassword_mismatch';

export const signUpSchema = PostAuthSignUpBody.extend({
  confirmPassword: z.string(),
}).refine((value) => value.password === value.confirmPassword, {
  path: ['confirmPassword'],
  error: confirmPasswordError,
});

export type SignUpState = Omit<SignUpPayload, 'password' | 'confirmPassword'>;
export type SignUpResponseError = postAuthSignUpResponseError['data']['error'];

export type SignUpActionState = ActionState<SignUpState, SignUpResponseError>;
