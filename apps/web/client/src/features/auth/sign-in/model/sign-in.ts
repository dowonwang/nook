import { PostAuthSignInBody } from '@packages/api-client/schema/auth';

import type { ActionState } from '$shared/api/action';
import type { postAuthSignInResponseError } from '@packages/api-client/api';
import type { z } from 'zod';

export const signInSchema = PostAuthSignInBody;
type SignInPayload = z.infer<typeof signInSchema>;

export type SignInState = Pick<SignInPayload, 'email'>;
export type SignInResponseError = postAuthSignInResponseError['data']['error'];

export type SignInActionState = ActionState<SignInState, SignInResponseError>;
