import { PostAuthSignInBody } from '@packages/api-client/schema/auth';
import { type z } from 'zod';

import type { ActionState } from '$shared/api/action';
import type { APP_CONSTANT } from '$shared/config';
import type {
  PostAuthSignIn200,
  postAuthSignInResponseError,
} from '@packages/api-client/api';

type SignInPayload = z.infer<typeof signInSchema>;

export const signInSchema = PostAuthSignInBody;

export type SignInState = Pick<SignInPayload, 'email'> & {
  [APP_CONSTANT.redirectQueryKey]: string;
};
export type SignInResponseError = postAuthSignInResponseError['data']['error'];
export type SignInResponseSuccess = PostAuthSignIn200;

export type SignInActionState = ActionState<SignInState, SignInResponseError>;
