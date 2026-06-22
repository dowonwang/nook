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
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

import { signInAction } from '$features/auth/sign-in/api';
import {
  useActionErrorMessage,
  useActionFieldErrors,
  type ActionStateZodError,
} from '$shared/api/action';
import { useRedirectOnCondition } from '$shared/lib/navigate';

export function SignInForm() {
  const t = useTranslations('validation');
  const [actionState, formAction] = useActionState(signInAction, {
    success: false,
    error: null,
    state: { email: '' },
  });

  const { register, getFieldError } = useActionFieldErrors(
    actionState.error as ActionStateZodError,
  );

  const emailError = getFieldError('email');
  const passwordError = getFieldError('password');
  const actionError = useActionErrorMessage(actionState.error);

  useRedirectOnCondition({
    condition: actionState.success,
    replace: true,
  });

  console.log(actionState);

  return (
    <form action={formAction} noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
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
          <FieldLabel htmlFor='password'>Password</FieldLabel>
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
          Log In
        </Button>

        <Separator content={"Don't have an account?"} />

        <Button variant='secondary' className='w-full' asChild>
          <Link href={'/sign-up'}>Sign Up</Link>
        </Button>
      </FieldGroup>
    </form>
  );
}
