import { PostAuthSignUpBody } from '@packages/api-client/schema/auth';
import { z } from 'zod';

import { SIGN_UP_CONFIRM_PASSWORD_ERROR } from '../config/i18n.key';

import type { ActionState } from '$shared/api/action';
import type { postAuthSignUpResponseError } from '@packages/api-client/api';

type SignUpPayload = z.infer<typeof signUpSchema>;

export const signUpSchema = PostAuthSignUpBody.extend({
  confirmPassword: z.string(),
}).refine((value) => value.password === value.confirmPassword, {
  path: ['confirmPassword'],
  error: SIGN_UP_CONFIRM_PASSWORD_ERROR,
});

export type SignUpState = Omit<SignUpPayload, 'password' | 'confirmPassword'>;
export type SignUpResponseError = postAuthSignUpResponseError['data']['error'];

export type SignUpActionState = ActionState<SignUpState, SignUpResponseError>;
