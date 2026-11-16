import { z } from 'zod';

export const AuthHttpModel = {
  signUpBody: z.object({
    name: z.string().trim().min(2).max(20),
    email: z.string().trim().toLowerCase().pipe(z.email()),
    // 영문, 숫자, 특수문자(공백 제외 ASCII)만 허용한다
    password: z
      .string()
      .trim()
      .min(8)
      .max(32)
      .regex(/^[!-~]+$/),
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
