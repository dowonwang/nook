'use client';

import { Button } from '@packages/ui/components/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@packages/ui/components/field';
import { Input } from '@packages/ui/components/input';
import { Separator } from '@packages/ui/components/separator';
import { WarningMessage } from '@packages/ui/components/warning-message';
import Link from 'next/link';
import { useT } from 'next-i18next/client';
import { useActionState } from 'react';

import {
  useActionErrorMessage,
  useActionFieldErrors,
} from '$shared/api/action';

import { signInServerAction } from '../api/action.server';
import { FEATURES_AUTH_SIGN_IN_I18N_NAMESPACE } from '../i18n';

import type { ActionStateZodError } from '$shared/api/action';

interface Props {
  redirectTo: string | string[] | undefined;
}

export function SignInForm({ redirectTo }: Props) {
  const { t } = useT([FEATURES_AUTH_SIGN_IN_I18N_NAMESPACE]);

  const redirectPath = typeof redirectTo === 'string' ? redirectTo : '/';

  const [actionState, formAction] = useActionState(signInServerAction, {
    success: false,
    error: null,
    state: { email: '', 'redirect-to': redirectPath },
  });

  const { register, getFieldError } = useActionFieldErrors(
    actionState.error as ActionStateZodError,
  );

  const emailError = getFieldError('email');
  const passwordError = getFieldError('password');
  const actionError = useActionErrorMessage(actionState.error);

  return (
    <form action={formAction} noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='email'>
            {t(`${FEATURES_AUTH_SIGN_IN_I18N_NAMESPACE}:email.label`)}
          </FieldLabel>
          <Input
            ref={register('email')}
            id='email'
            type='email'
            name='email'
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
          <FieldLabel htmlFor='password'>
            {t(`${FEATURES_AUTH_SIGN_IN_I18N_NAMESPACE}:password.label`)}
          </FieldLabel>
          <Input
            ref={register('password')}
            id='password'
            type='password'
            name='password'
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? 'password-error' : undefined}
          />
          {passwordError && (
            <FieldDescription id='password-error'>
              {t(passwordError)}
            </FieldDescription>
          )}
        </Field>

        {actionError && <WarningMessage>{actionError}</WarningMessage>}

        <Button type='submit' className='w-full'>
          {t(`${FEATURES_AUTH_SIGN_IN_I18N_NAMESPACE}:button.sign_in`)}
        </Button>

        <Separator
          content={t(
            `${FEATURES_AUTH_SIGN_IN_I18N_NAMESPACE}:message.no_account`,
          )}
        />

        <Button variant='secondary' className='w-full' asChild>
          <Link href={'/signup'}>
            {t(`${FEATURES_AUTH_SIGN_IN_I18N_NAMESPACE}:button.sign_up`)}
          </Link>
        </Button>
      </FieldGroup>
    </form>
  );
}
