export interface OrganizationPolicy {
  assertCreatableTitleByUser(userId: string, title: string): Promise<void>;
}
