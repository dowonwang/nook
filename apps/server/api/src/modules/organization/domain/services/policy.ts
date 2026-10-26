export interface OrganizationPolicyService {
  assertCreatableTitleByUser(userId: string, title: string): Promise<void>;
}
