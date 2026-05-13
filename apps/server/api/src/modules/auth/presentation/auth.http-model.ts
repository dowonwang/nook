import { z } from 'zod';

export const AuthHttpModel = {
  signUpBody: z.object({
    email: z.string().trim().toLowerCase().pipe(z.email()),
    name: z.string().trim().min(5).max(20),
    password: z.string().trim(),
  }),

  signInBody: z.object({
    email: z.string().trim().toLowerCase().pipe(z.email()),
    password: z.string().trim(),
  }),
};

export type AuthHttpModel = {
  [K in keyof typeof AuthHttpModel]: z.infer<(typeof AuthHttpModel)[K]>;
};
