'use server';

import { actionStateBuilder, createActionStateError } from '$shared/api/action';
import { bffFetcher } from '$shared/api/bff/bff-fetcher';

import {
  createOrganizationInvitationSchema,
  INIT_DATA,
} from '../model/create-invitation';

import type {
  CreateOrganizationInvitationActionState,
  CreateOrganizationInvitationResponseError,
  CreateOrganizationInvitationState,
} from '../model/create-invitation';

export async function createOrganizationInvitationAction(
  _previousState: CreateOrganizationInvitationActionState,
  formData: FormData,
) {
  const organizationIdValue = formData.get('organizationId');
  const emailValue = formData.get('email');
  const roleValue = formData.get('role');

  const email = typeof emailValue === 'string' ? emailValue.trim() : '';
  const role = typeof roleValue === 'string' ? roleValue.trim() : '';
  const organizationId =
    typeof organizationIdValue === 'string' ? organizationIdValue.trim() : '';

  const body = createOrganizationInvitationSchema.safeParse({
    email,
    role,
    organizationId,
  });

  if (!body.success) {
    return actionStateBuilder.error<
      CreateOrganizationInvitationState,
      CreateOrganizationInvitationResponseError['error']
    >(INIT_DATA, createActionStateError(body.error));
  }

  const response = await bffFetcher(
    `/api/organization/${organizationId}/invitations`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body.data),
    },
  );

  if (response.ok) {
    return actionStateBuilder.success(INIT_DATA);
  }

  return actionStateBuilder.error(
    INIT_DATA,
    ((await response.json()) as CreateOrganizationInvitationResponseError)
      .error,
  );
}
