import { PatchOrganizationInvitationBody } from '@packages/api-client/schema/organization';

import type { z } from 'zod';
import type {
  PatchOrganizationInvitation200,
  patchOrganizationInvitationResponseError,
} from '@packages/api-client/api';
import type { ActionState } from '$shared/api/action';

type Payload = z.infer<typeof changeOrganizationInvitationStatusSchema>;

export const INIT_DATA = {
  invitationId: '',
  status: 'PENDING',
} satisfies ChangeOrganizationInvitationStatusState;

export const changeOrganizationInvitationStatusSchema =
  PatchOrganizationInvitationBody;

export type ChangeOrganizationInvitationStatusState = Payload;
export type ChangeOrganizationInvitationStatusResponseError =
  patchOrganizationInvitationResponseError['data'];
export type ChangeOrganizationInvitationStatusResponseSuccess =
  PatchOrganizationInvitation200;

export type ChangeOrganizationInvitationStatusActionState = ActionState<
  ChangeOrganizationInvitationStatusState,
  ChangeOrganizationInvitationStatusResponseError['error']
>;
