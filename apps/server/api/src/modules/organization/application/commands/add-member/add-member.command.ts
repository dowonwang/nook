import type { OrganizationMemberRole } from '@packages/api-db';

export class AddMemberCommand {
  constructor(
    public readonly organizationId: string,
    public readonly userId: string,
    public readonly members: { userId: string; role: OrganizationMemberRole }[],
  ) {}
}
