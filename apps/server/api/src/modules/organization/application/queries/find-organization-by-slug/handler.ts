import {
  InvalidOrganizationSlugError,
  OrganizationNotFoundError,
} from '$modules/organization/error';

import { FindOrganizationBySlugQuery } from './query';
import { OrganizationDtoMapper } from '../../mappers/organization';

import type { FindOrganizationBySlugInput } from './query';
import type { UserOrganizationDto } from '../../dto/organization';
import type { OrganizationReaderPort } from '../../ports/reader';

export class FindOrganizationBySlugHandler {
  constructor(private readonly organizationReader: OrganizationReaderPort) {}

  async execute(
    input: FindOrganizationBySlugInput,
  ): Promise<UserOrganizationDto> {
    const query = this.createQuery(input);

    const organization = await this.organizationReader.findBySlug(query.slug);

    // 소속되지 않은 조직은 존재 여부를 드러내지 않도록 없는 조직과 동일하게 404 처리
    const dto = organization
      ? OrganizationDtoMapper.toUserOrganization(query.userId, organization)
      : null;

    if (!dto) {
      throw new OrganizationNotFoundError(FindOrganizationBySlugHandler.name);
    }

    return dto;
  }

  // URL로 들어온 slug가 형식에 맞지 않으면 존재할 수 없는 조직이므로 404로 응답
  private createQuery(
    input: FindOrganizationBySlugInput,
  ): FindOrganizationBySlugQuery {
    try {
      return new FindOrganizationBySlugQuery(input);
    } catch (error) {
      if (error instanceof InvalidOrganizationSlugError) {
        throw new OrganizationNotFoundError(FindOrganizationBySlugHandler.name);
      }

      throw error;
    }
  }
}
