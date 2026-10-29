import { z } from 'zod';

import { InvalidUserEmailError } from '$modules/user/error';
import { PrimitiveValueObject } from '$shared/ddd';

const schema = z.email();

export class UserEmailVo extends PrimitiveValueObject<string, UserEmailVo> {
  private constructor(value: string) {
    super(value);
  }

  // 대소문자·공백 차이로 같은 이메일이 다르게 조회되지 않도록 정규화
  static create(input: string): UserEmailVo {
    return new UserEmailVo(input.trim().toLowerCase());
  }

  protected validation(input: string): void {
    const validation = schema.safeParse(input);

    if (!validation.success) {
      throw new InvalidUserEmailError(UserEmailVo.name);
    }
  }
}
