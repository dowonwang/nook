import { UserUuid } from '$modules/user/domain';

export interface FindReceivedInvitationsInput {
  userId: string;
}

export class FindReceivedInvitationsQuery {
  public readonly userId: UserUuid;

  constructor(input: FindReceivedInvitationsInput) {
    this.userId = UserUuid.create(input.userId);
  }
}
