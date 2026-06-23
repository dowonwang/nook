import { z } from 'zod';

export const AuthResponseSchemas = {
  signUp: z.object({
    id: z.uuidv7(),
  }),
  signIn: z.object({
    accessToken: z.jwt(),
    refreshToken: z.jwt(),
    user: z.object({
      id: z.uuidv7(),
      email: z.email(),
      name: z.string(),
    }),
  }),
  me: z.object({
    id: z.uuidv7(),
    email: z.email(),
    name: z.string(),
  }),
};
