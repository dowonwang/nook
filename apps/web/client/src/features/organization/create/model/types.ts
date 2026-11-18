import { PostOrganizationBody } from '@packages/api-client/schema/organization';

import type {
  PostOrganization201,
  postOrganizationResponseError,
} from '@packages/api-client/api';
import type { Organization } from '$entities/organization';
import type { ActionState } from '$shared/api/action';

export const createOrganizationSchema = PostOrganizationBody;

export type CreateOrganizationState = Organization;
export type CreateOrganizationResponseError =
  postOrganizationResponseError['data'];
export type CreateOrganizationResponseSuccess = PostOrganization201;

export type CreateOrganizationActionState = ActionState<
  CreateOrganizationState,
  CreateOrganizationResponseError['error']
>;
