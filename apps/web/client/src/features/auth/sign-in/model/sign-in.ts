import { PostAuthSignInBody } from '@packages/api-client/schema/auth';

import type { z } from 'zod';

export const signInSchema = PostAuthSignInBody;
type SignInPayload = z.infer<typeof signInSchema>;

export type SignInActionState = {
  success: boolean;
  state: Pick<SignInPayload, 'email'>;
  error: unknown;
};
