'use client';

import { Button } from '@packages/ui/components/button';
import { useFormStatus } from 'react-dom';

import { signOutAction } from '../api/sign-out-action.server';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' variant='secondary' disabled={pending}>
      Sign Out
    </Button>
  );
}

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <SubmitButton />
    </form>
  );
}
