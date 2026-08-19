'use client';

import { Button } from '@packages/ui/components/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from '@packages/ui/components/field';
import { Input } from '@packages/ui/components/input';
import { WarningMessage } from '@packages/ui/components/warning-message';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

import { OrganizationMemberRoleRadioGroup } from '$entities/organization-member';
import { ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY } from '$features/organization-invitation/sent-list/config/query-key';
import {
  useActionErrorMessage,
  useActionFieldErrors,
} from '$shared/api/action';

import { createOrganizationInvitationAction } from '../api/create-invitation.server';
import { INIT_DATA } from '../model/create-invitation';

import type { Organization } from '$entities/organization';
import type { ActionStateZodError } from '$shared/api/action';

interface Props {
  organization: Organization | null;
  disabled?: boolean;
}

export function CreateOrganizationInvitationForm({
  organization,
  disabled = false,
}: Props) {
  const t = useTranslations('validation');
  const [actionState, formAction, isPending] = useActionState(
    createOrganizationInvitationAction,
    {
      success: false,
      error: null,
      state: INIT_DATA,
    },
  );
  const queryClient = useQueryClient();

  const { register, getFieldError } = useActionFieldErrors(
    actionState.error as ActionStateZodError,
  );

  const emailError = getFieldError('email');
  const roleError = getFieldError('role');
  const actionError = useActionErrorMessage(actionState.error);

  useEffect(() => {
    if (!actionState.success || !organization?.id || isPending) {
      return;
    }

    void queryClient.invalidateQueries({
      queryKey: ORGANIZATION_INVITATION_SENT_LIST_QUERY_KEY(organization.id),
    });
  }, [actionState.success, organization?.id, isPending]);

  return (
    <form action={formAction} noValidate>
      <Input name='organizationId' defaultValue={organization?.id} hidden />

      <FieldGroup disabled={disabled}>
        <Field>
          <FieldLabel htmlFor='organizationId'>조직명</FieldLabel>
          <Input
            id='organizationId'
            name='organizationId'
            readOnly
            defaultValue={organization?.title}
          />
        </Field>

        <div className='grid grid-cols-2 gap-4'>
          <Field>
            <FieldLabel>User email</FieldLabel>
            <Input
              ref={register('email')}
              id='email'
              name='email'
              type='email'
              defaultValue={actionState.state.email}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'email-error' : undefined}
            />

            {emailError && (
              <FieldDescription id='email-error'>
                {t(emailError)}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLegend>Role</FieldLegend>
            <OrganizationMemberRoleRadioGroup
              name='role'
              defaultChecked={actionState.state.role}
            />

            {roleError && <FieldDescription>{t(roleError)}</FieldDescription>}
          </Field>
        </div>

        {actionError && <WarningMessage>{actionError}</WarningMessage>}

        <Button className='ml-auto block'>Invite</Button>
      </FieldGroup>
    </form>
  );
}
