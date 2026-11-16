import { AuthInvalidCredentialsError } from '$modules/auth/error';

import type {
  UserEntity,
  UserCommandRepository,
  UserEmailVo,
} from '$modules/user/domain';
import type { PasswordHasherPort } from '../ports/password-hasher';

interface Credential {
  email: UserEmailVo;
  password: string;
}

// 없는 이메일에도 해시 비교를 수행해 응답 시간으로 계정 존재 여부를 추측할 수 없게 한다.
// 해시하려면 비밀번호 규칙(8~32자, 공백 제외 ASCII)을 만족해야 한다
const DUMMY_PASSWORD = 'Dummy-Password-For-Timing-1!';

export class CredentialAuthenticatorService {
  readonly #dummyPasswordHash: Promise<string>;

  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly passwordHasher: PasswordHasherPort,
  ) {
    // 필드 초기값은 passwordHasher 주입보다 먼저 실행되므로 생성자 본문에서 만든다
    this.#dummyPasswordHash = this.passwordHasher.hash(DUMMY_PASSWORD);
  }

  async authenticate(credential: Credential): Promise<UserEntity> {
    const user = await this.userCommandRepository.findByEmail(
      credential.email.getValue(),
    );

    const isMatched = await this.passwordHasher.compare(
      credential.password,
      user ? user.password.getValue() : await this.#dummyPasswordHash,
    );

    if (!user || !isMatched) {
      throw new AuthInvalidCredentialsError(
        CredentialAuthenticatorService.name,
      );
    }

    return user;
  }
}
