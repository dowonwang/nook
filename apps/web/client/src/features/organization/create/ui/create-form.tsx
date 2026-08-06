'use client';

import { Button } from '@packages/ui/components/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@packages/ui/components/field';
import { Input } from '@packages/ui/components/input';
import { WarningMessage } from '@packages/ui/components/warning-message';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

import {
  useActionErrorMessage,
  useActionFieldErrors,
} from '$shared/api/action';

import { createOrganizationAction } from '../api/create-organization-action.server';

import type { ActionStateZodError } from '$shared/api/action';

interface Props {
  onSuccess: (organization: { id: string; title: string } | null) => void;
}

export function CreateOrganizationForm({ onSuccess }: Props) {
  const t = useTranslations('validation');
  const [actionState, formAction] = useActionState(createOrganizationAction, {
    success: false,
    error: null,
    state: { id: '', title: '' },
  });

  const { register, getFieldError } = useActionFieldErrors(
    actionState.error as ActionStateZodError,
  );

  const actionError = useActionErrorMessage(actionState.error);
  const titleError = getFieldError('title');

  useEffect(() => {
    if (actionState.success) {
      onSuccess({
        id: actionState.state.id,
        title: actionState.state.title,
      });

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      return;
    } else {
      onSuccess(null);
    }
  }, [actionState.success]);

  return (
    <form action={formAction} noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='title'>Title</FieldLabel>
          {titleError && (
            <FieldDescription id='title-error'>
              {t(titleError)}
            </FieldDescription>
          )}
          <Input
            ref={register('title')}
            id='title'
            name='title'
            type='text'
            defaultValue={actionState.state.title}
            aria-invalid={!!titleError}
            aria-describedby={titleError ? 'title-error' : undefined}
            disabled={actionState.success}
          />
        </Field>

        {actionError && (
          <WarningMessage className='-my-2'>{actionError}</WarningMessage>
        )}

        <Button
          type='submit'
          className='ml-auto block'
          disabled={actionState.success}
        >
          Save
        </Button>
      </FieldGroup>
    </form>
  );
}
