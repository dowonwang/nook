import { compare, hash } from 'bcrypt';

import { PasswordPolicy } from '$modules/auth/domain';

import type { PasswordHasherPort } from '$modules/auth/application';

export class BcryptPasswordHasherAdapter implements PasswordHasherPort {
  constructor(private readonly saltRounds = 10) {}

  async hash(rawPassword: string): Promise<string> {
    // 요청 검증을 거치지 않은 호출도 규칙에 맞는 비밀번호만 해시하도록 한 번 더 확인한다
    PasswordPolicy.assertValidRawPassword(rawPassword);

    return hash(rawPassword, this.saltRounds);
  }

  compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(rawPassword, hashedPassword);
  }
}
