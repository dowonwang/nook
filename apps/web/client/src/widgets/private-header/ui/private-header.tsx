'use client';

import { Button } from '@packages/ui/components/button';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Bell } from 'lucide-react';
import { redirect } from 'next/navigation';

import { sessionQueryOptions } from '$entities/session';
import { UserAvatar } from '$entities/user';
import { SignOutButton } from '$features/auth/sign-out';

export function PrivateHeader() {
  const today = dayjs().format('dddd, MMM D');
  const { data } = useQuery(sessionQueryOptions);

  if (!data?.authenticated) {
    redirect('/signin');
  }

  return (
    <header className='bg-header border-border h-header flex items-center justify-between gap-4 border-b px-6'>
      <div>
        <span className='text-secondary-foreground'>{today}</span>
      </div>

      <div className='flex items-center gap-4'>
        <Button variant='secondary' size='icon'>
          <Bell />
        </Button>

        <UserAvatar name={data.user.name} />
        <SignOutButton />
      </div>
    </header>
  );
}
