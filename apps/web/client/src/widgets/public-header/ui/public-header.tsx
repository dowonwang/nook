'use client';

import { useQuery } from '@tanstack/react-query';

import { sessionQueryOptions } from '$entities/session';
import { CLIENT_ENV_CONFIG } from '$shared/config/client';
import { AppLogo } from '$shared/ui';

import { AuthenticatedButtonGroup } from './authenticated-button-group';
import { UnauthenticatedButtonGroup } from './unauthenticated-button-group';

export function PublicHeader() {
  const { data } = useQuery(sessionQueryOptions);

  return (
    <header className='bg-header/80 h-header border-border sticky top-0 flex items-center overflow-hidden border-b px-4 backdrop-blur-md'>
      <div className='container mx-auto flex items-center justify-between'>
        <a href='/' className='flex items-center gap-3'>
          <AppLogo width={36} height={36} />
          <span className='text-lg font-semibold whitespace-nowrap'>
            {CLIENT_ENV_CONFIG.APP_NAME}
          </span>
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
