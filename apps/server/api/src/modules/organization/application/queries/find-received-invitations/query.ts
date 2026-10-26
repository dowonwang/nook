import { UserUuidVo } from '$modules/user/domain';

export interface FindReceivedInvitationsInput {
  userId: string;
}

export class FindReceivedInvitationsQuery {
  public readonly userId: UserUuidVo;

  constructor(input: FindReceivedInvitationsInput) {
    this.userId = UserUuidVo.create(input.userId);
  }
}
