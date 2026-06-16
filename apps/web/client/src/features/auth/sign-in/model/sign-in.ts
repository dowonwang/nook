import { PostAuthSignInBody } from '@packages/api-client/schema/auth';

import type { PostAuthSignInResponse } from '@packages/api-client/schema/auth';
import type { z } from 'zod';

export const signInSchema = PostAuthSignInBody;

export type SignInActionState = {
  success: boolean;
  state: Pick<SignInPayload, 'email'>;
  error: unknown;
};
export type SignInPayload = z.infer<typeof signInSchema>;
export type SignInResponse = z.infer<typeof PostAuthSignInResponse>;
