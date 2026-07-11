import { Button } from '@packages/ui/components/button';
import { Moon } from 'lucide-react';
import Link from 'next/link';

export function AuthenticatedButtonGroup() {
  return (
    <div className='flex items-center gap-2'>
      <Button variant='secondary' size='icon'>
        <Moon />
      </Button>
      <Button variant='secondary' asChild>
        <Link href={'/signin'}>Sign out</Link>
      </Button>
      <Button asChild>
        <Link href={'/dashboard'}>Dashboard</Link>
      </Button>
    </div>
  );
}
