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
import Link from 'next/link';
import { useActionState } from 'react';

import { signInAction } from '$features/auth/sign-in/api';

export function SignInForm() {
  const [actionState, formAction] = useActionState(signInAction, {
    success: false,
    error: null,
    state: { email: '' },
  });

  console.log(actionState);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input
            id='email'
            type='email'
            name='email'
            defaultValue={actionState.state.email}
          />
          <FieldDescription></FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <Input id='password' type='password' name='password' />
        </Field>

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
