'use client';

import { Button } from '@packages/ui/components/button';
import { LogOut } from 'lucide-react';
import { useTransition } from 'react';

import { signOutServerAction } from '../api/action.server';

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await signOutServerAction();
    });
  };

  return (
    <Button
      type='submit'
      variant='secondary'
      size='icon'
      disabled={isPending}
      onClick={onClick}
    >
      <LogOut />
    </Button>
  );
}
