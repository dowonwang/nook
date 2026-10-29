import { InvalidOrganizationSlugError } from '$modules/organization/error';
import { PrimitiveValueObject } from '$shared/ddd';

// 시스템이 생성하는 짧은 주소: 영어 소문자·숫자 10자
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
const LENGTH = 10;
const PATTERN = /^[a-z0-9]{10}$/;

// 256을 넘지 않는 ALPHABET 길이의 최대 배수, 이 이상인 바이트는 버려 모듈로 편향을 막음
const UNBIASED_LIMIT = Math.floor(256 / ALPHABET.length) * ALPHABET.length;

export class OrganizationSlugVo extends PrimitiveValueObject<
  string,
  OrganizationSlugVo
> {
  private constructor(value: string) {
    super(value);
  }

  // URL 등 외부 입력은 대소문자 차이로 다르게 조회되지 않도록 정규화
  static create(input: string): OrganizationSlugVo {
    return new OrganizationSlugVo(input.trim().toLowerCase());
  }

  static generate(): OrganizationSlugVo {
    let value = '';

    while (value.length < LENGTH) {
      for (const byte of crypto.getRandomValues(new Uint8Array(LENGTH))) {
        if (byte < UNBIASED_LIMIT && value.length < LENGTH) {
          value += ALPHABET[byte % ALPHABET.length];
        }
      }
    }

    return new OrganizationSlugVo(value);
  }

  protected validation(input: string): void {
    if (!PATTERN.test(input)) {
      throw new InvalidOrganizationSlugError(OrganizationSlugVo.name);
    }
  }
}
