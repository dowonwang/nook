import { Button } from '@packages/ui/components/button';
import { Moon } from 'lucide-react';
import Link from 'next/link';

export function UnauthenticatedButtonGroup() {
  return (
    <div className='flex items-center gap-2'>
      <Button variant='secondary' size='icon'>
        <Moon />
      </Button>
      <Button variant='secondary' asChild>
        <Link href={'/signin'}>Sign in</Link>
      </Button>
      <Button>
        <Link href={'/signup'}>Sign Up</Link>
      </Button>
    </div>
  );
}
