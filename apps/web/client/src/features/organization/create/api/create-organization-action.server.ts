'use server';

import { actionStateBuilder, createActionStateError } from '$shared/api/action';
import { bffFetcher } from '$shared/api/bff/bff-fetcher';

import { createOrganizationSchema } from '../model/create-organization';

import type {
  CreateOrganizationResponseError,
  CreateOrganizationState,
  CreateOrganzationResponseSuccess,
  CreateOrganizationActionState,
} from '../model/create-organization';
import type { postOrganizationResponseError } from '@packages/api-client/api';

export async function createOrganizationAction(
  _previousState: CreateOrganizationActionState,
  formData: FormData,
): Promise<CreateOrganizationActionState> {
  const titleValue = formData.get('title');

  const title = typeof titleValue === 'string' ? titleValue.trim() : '';

  const body = createOrganizationSchema.safeParse({
    title,
  });

  if (!body.success) {
    return actionStateBuilder.error<
      CreateOrganizationState,
      CreateOrganizationResponseError
    >(
      {
        id: '',
        title,
      },
      createActionStateError(body.error),
    );
  }

  const response = await bffFetcher('/api/organization', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  });

  if (response.ok) {
    const { data } =
      (await response.json()) as CreateOrganzationResponseSuccess;
    return actionStateBuilder.success({ title, id: data.id });
  }

  return actionStateBuilder.error(
    { id: '', title },
    ((await response.json()) as postOrganizationResponseError['data']).error,
  );
}
