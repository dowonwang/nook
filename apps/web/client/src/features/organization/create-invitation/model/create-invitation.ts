import { PostOrganizationByOrganizationIdInvitationsBody } from '@packages/api-client/schema/organization';
import { z } from 'zod';

import { CREATE_INVITATION_REQUIRED_ORGANIZATION_ID_ERROR } from '../config/i18n.key';

import type { CreateOrganizationResponseError } from '$features/organization/create/model/create-organization';
import type { ActionState } from '$shared/api/action';
import type {
  PostOrganizationByOrganizationIdInvitations201,
  postOrganizationByOrganizationIdInvitationsResponseError,
} from '@packages/api-client/api';

type Payload = z.infer<typeof createOrganizationInvitationSchema>;

export const INIT_DATA = {
  organizationId: '',
  email: '',
  role: 'MEMBER',
} satisfies CreateOrganizationInvitationState;

export const createOrganizationInvitationSchema =
  PostOrganizationByOrganizationIdInvitationsBody.extend({
    organizationId: z.uuidv7({
      error: CREATE_INVITATION_REQUIRED_ORGANIZATION_ID_ERROR,
    }),
  });

export type CreateOrganizationInvitationState = Payload;
export type CreateOrganizationInvitationResponseError =
  postOrganizationByOrganizationIdInvitationsResponseError['data'];
export type CreateOrganizationInvitationResponseSuccess =
  PostOrganizationByOrganizationIdInvitations201;

export type CreateOrganizationInvitationActionState = ActionState<
  CreateOrganizationInvitationState,
  CreateOrganizationResponseError['error']
>;
