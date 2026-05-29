import { Button } from '@packages/ui/components/button';
import { Moon } from 'lucide-react';
import Link from 'next/link';

import { CLIENT_ENV_CONFIG } from '$shared/config';
import { AppLogo } from '$shared/ui';

export function PublicHeader() {
  return (
    <header className='bg-header/80 h-header border-border sticky top-0 flex items-center overflow-hidden border-b px-4 backdrop-blur-md'>
      <div className='container mx-auto flex items-center justify-between'>
        <a href='/' className='flex items-center gap-3'>
          <AppLogo width={36} height={36} />
          <span className='text-lg font-semibold whitespace-nowrap'>
            {CLIENT_ENV_CONFIG.APP_NAME}
          </span>
        </a>

        <div className='flex items-center gap-2'>
          <Button variant='secondary' size='icon'>
            <Moon />
          </Button>
          <Button variant='secondary' asChild>
            <Link href={'/login'}>Log in</Link>
          </Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
}
