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
import { useT } from 'next-i18next/client';
import { useActionState } from 'react';

import {
  useActionErrorMessage,
  useActionFieldErrors,
} from '$shared/api/action';

import { signUpAction } from '../api/sign-up-action.server';
import { FEAT_AUTH_SIGN_UP_I18N_NAMESPACE } from '../i18n';

import type { ActionStateZodError } from '$shared/api/action';

export function SignUpForm() {
  const { t } = useT([FEAT_AUTH_SIGN_UP_I18N_NAMESPACE]);
  const [actionState, formAction] = useActionState(signUpAction, {
    success: false,
    error: null,
    state: { name: '', email: '' },
  });

  const { register, getFieldError } = useActionFieldErrors(
    actionState.error as ActionStateZodError,
  );

  const nameError = getFieldError('name');
  const emailError = getFieldError('email');
  const passwordError = getFieldError('password');
  const confirmPasswordError = getFieldError('confirmPassword');

  const actionError = useActionErrorMessage(actionState.error);

  return (
    <form action={formAction} noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='name'>
            {t(`${FEAT_AUTH_SIGN_UP_I18N_NAMESPACE}:name.label`)}
          </FieldLabel>
          <Input
            ref={register('name')}
            id='name'
            name='name'
            type='text'
            defaultValue={actionState.state.name}
            aria-invalid={!!nameError}
            aria-describedby={nameError ? 'name-error' : undefined}
          />

          {nameError && (
            <FieldDescription id='name-error'>{t(nameError)}</FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='email'>
            {t(`${FEAT_AUTH_SIGN_UP_I18N_NAMESPACE}:email.label`)}
          </FieldLabel>
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
          <FieldLabel htmlFor='password'>
            {t(`${FEAT_AUTH_SIGN_UP_I18N_NAMESPACE}:password.label`)}
          </FieldLabel>
          <Input
            ref={register('password')}
            id='password'
            name='password'
            type='password'
            autoComplete='new-password'
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? 'password-error' : undefined}
          />

          {passwordError && (
            <FieldDescription id='password-error'>
              {t(passwordError)}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='confirmPassword'>
            {t(`${FEAT_AUTH_SIGN_UP_I18N_NAMESPACE}:password_confirm.label`)}
          </FieldLabel>
          <Input
            ref={register('confirmPassword')}
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            autoComplete='new-password'
            aria-invalid={!!confirmPasswordError}
            aria-describedby={
              confirmPasswordError ? 'confirmPassword-error' : undefined
            }
          />

          {confirmPasswordError && (
            <FieldDescription id='confirmPassword-error'>
              {t(confirmPasswordError)}
            </FieldDescription>
          )}
        </Field>

        {actionError && <WarningMessage>{actionError}</WarningMessage>}

        <Separator />

        <Button className='w-full' type='submit'>
          {t(`${FEAT_AUTH_SIGN_UP_I18N_NAMESPACE}:button.sign_up`)}
        </Button>
      </FieldGroup>
    </form>
  );
}
