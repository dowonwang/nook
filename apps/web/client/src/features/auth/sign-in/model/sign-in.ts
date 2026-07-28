import { PostAuthSignInBody } from '@packages/api-client/schema/auth';

import type { ActionState } from '$shared/api/action';
import type {
  PostAuthSignIn200,
  postAuthSignInResponseError,
} from '@packages/api-client/api';
import type { z } from 'zod';

type SignInPayload = z.infer<typeof signInSchema>;

export const signInSchema = PostAuthSignInBody;

export type SignInState = Pick<SignInPayload, 'email'>;
export type SignInResponseError = postAuthSignInResponseError['data']['error'];
export type SignInResponseSuccess = PostAuthSignIn200;

export type SignInActionState = ActionState<SignInState, SignInResponseError>;
