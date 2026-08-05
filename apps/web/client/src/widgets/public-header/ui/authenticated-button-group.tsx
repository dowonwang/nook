import { Button } from '@packages/ui/components/button';
import { Moon } from 'lucide-react';
import Link from 'next/link';

import { SignOutButton } from '$features/auth/sign-out';

export function AuthenticatedButtonGroup() {
  return (
    <div className='flex items-center gap-2'>
      <Button variant='secondary' size='icon'>
        <Moon />
      </Button>

      <SignOutButton />

      <Button asChild>
        <Link href={'/dashboard'}>Dashboard</Link>
      </Button>
    </div>
  );
}
