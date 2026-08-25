import { z } from 'zod';

import { InvalidOrganizationInvitationStatus } from '$modules/organization/error';
import { PrimitiveValueObject } from '$shared/ddd';

const schema = z.enum([
  'PENDING', // 초대 발송(대기중)
  'ACCEPTED', // 수락함 (즉시 조직 참여)
  'CANCELED', // 관리자가 초대 취소
  'REJECTED', // 사용자 초대 거절
]);
export type OrganizationInvitationStatusValue = z.infer<typeof schema>;

export class OrganizationInvitationStatus extends PrimitiveValueObject<
  OrganizationInvitationStatusValue,
  OrganizationInvitationStatus
> {
  private constructor(value: OrganizationInvitationStatusValue) {
    super(value);
  }

  static create(
    input: OrganizationInvitationStatusValue,
  ): OrganizationInvitationStatus {
    return new OrganizationInvitationStatus(input);
  }

  protected validation(input: OrganizationInvitationStatusValue): void {
    const validation = schema.safeParse(input);

    if (!validation.success) {
      throw new InvalidOrganizationInvitationStatus(
        OrganizationInvitationStatus.name,
      );
    }
  }
}
