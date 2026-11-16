import { z } from 'zod';

import { AuthInvalidPasswordFormatError } from '$modules/auth/error';

const SCOPE = 'PasswordPolicy' as const;

// 8~32자, 영문·숫자·특수문자(공백 제외 ASCII)만 허용한다
const rawPasswordSchema = z
  .string()
  .min(8)
  .max(32)
  .regex(/^[!-~]+$/);

export const PasswordPolicy = {
  assertValidRawPassword(rawPassword: string): void {
    if (!rawPasswordSchema.safeParse(rawPassword).success) {
      throw new AuthInvalidPasswordFormatError(SCOPE);
    }
  },
} as const;
