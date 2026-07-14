import { z } from 'zod';

export const AuthHttpModel = {
  signUpBody: z.object({
    name: z.string().trim().min(2).max(20),
    email: z.string().trim().toLowerCase().pipe(z.email()),
    password: z.string().trim(),
  }),

  signInBody: z.object({
    email: z.string().trim().toLowerCase().pipe(z.email()),
    password: z.string().trim(),
  }),

  refreshBody: z.object({}),

  signOutBody: z.object({}),
};

export type AuthHttpModel = {
  [K in keyof typeof AuthHttpModel]: z.infer<(typeof AuthHttpModel)[K]>;
};
