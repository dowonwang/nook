export interface OrganizationQueryRepository {
  findOrganizationIdByUserIdAndTitle(
    userId: string,
    title: string,
  ): Promise<string | null>;
}
