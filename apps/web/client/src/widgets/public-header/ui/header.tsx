'use client';

import { useQuery } from '@tanstack/react-query';

import { sessionQueryOptions } from '$entities/session';
import { AppLogo, AppName } from '$shared/ui';

import { AuthenticatedButtonGroup } from './button-group/authenticated';
import { UnauthenticatedButtonGroup } from './button-group/unauthenticated';

export function PublicHeader() {
  const { data } = useQuery(sessionQueryOptions);

  return (
    <header className='bg-header/80 h-header border-border shadow-soft sticky top-0 flex items-center overflow-hidden border-b px-4 backdrop-blur-md'>
      <div className='container mx-auto flex items-center justify-between'>
        <a href='/' className='flex items-center gap-3 text-xl'>
          <AppLogo width={36} height={36} />
          <AppName />
        </a>

        {data?.authenticated ? (
          <AuthenticatedButtonGroup />
        ) : (
          <UnauthenticatedButtonGroup />
        )}
      </div>
    </header>
  );
}
