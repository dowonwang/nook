import { z } from 'zod';

export const AuthResponse = {
  signUp: z.object({}),
  signIn: z.object({}),
  me: z.object({
    id: z.string(),
    email: z.email(),
    name: z.string(),
  }),
};
