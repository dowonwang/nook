import { PostAuthSignInBody } from '@packages/api-client/schema';

import type { PostAuthSignInResponse } from '@packages/api-client/schema';
import type { z } from 'zod';

export const signInSchema = PostAuthSignInBody;

export type SignInPayload = z.infer<typeof signInSchema>;
export type SignInResponse = z.infer<typeof PostAuthSignInResponse>;
