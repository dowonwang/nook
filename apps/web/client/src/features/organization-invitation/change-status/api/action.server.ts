'use server';

import { actionStateBuilder, createActionStateError } from '$shared/api/action';
import { bffFetcher } from '$shared/api/bff/bff-fetcher';

import { changeOrganizationInvitationStatusSchema } from '../model/types';

import type {
  ChangeOrganizationInvitationStatusResponseError,
  ChangeOrganizationInvitationStatusState,
} from '../model/types';

export async function changeOrganizationInvitationServerAction({
  invitationId,
  status,
}: ChangeOrganizationInvitationStatusState) {
  const body = changeOrganizationInvitationStatusSchema.safeParse({
    invitationId,
    status,
  });

  if (!body.success) {
    return actionStateBuilder.error<
      null,
      ChangeOrganizationInvitationStatusResponseError['error']
    >(null, createActionStateError(body.error));
  }

  const response = await bffFetcher(`/api/organization/invitation`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body.data),
  });

  if (response.ok) {
    return actionStateBuilder.success(null);
  }

  return actionStateBuilder.error(
    null,
    (await response.json()) as ChangeOrganizationInvitationStatusResponseError,
  );
}
