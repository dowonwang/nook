import { PostOrganizationBody } from '@packages/api-client/schema/organization';

import type { ActionState } from '$shared/api/action';
import type {
  PostOrganization201,
  postOrganizationResponseError,
} from '@packages/api-client/api';

export const createOrganizationSchema = PostOrganizationBody;

export type CreateOrganizationState = {
  id: string;
  title: string;
};
export type CreateOrganizationResponseError =
  postOrganizationResponseError['data'];
export type CreateOrganizationResponseSuccess = PostOrganization201;

export type CreateOrganizationActionState = ActionState<
  CreateOrganizationState,
  CreateOrganizationResponseError['error']
>;
