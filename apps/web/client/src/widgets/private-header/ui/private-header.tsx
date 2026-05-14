import {
  Avatar,
  AvatarBody,
  AvatarFallBack,
} from '@packages/ui/components/avatar';
import { Button } from '@packages/ui/components/button';
import dayjs from 'dayjs';
import { Bell } from 'lucide-react';

export function PrivateHeader() {
  const today = dayjs().format('dddd, MMM D');

  return (
    <header className='bg-header border-border h-header flex items-center justify-between gap-4 border-b px-6'>
      <div>
        <span className='text-secondary-text'>{today}</span>
      </div>

      <div className='flex items-center gap-4'>
        <Button variant='secondary' size='icon'>
          <Bell />
        </Button>

        <Avatar>
          <AvatarFallBack>Avatar</AvatarFallBack>
          <AvatarBody>
            <span className='font-semibold'>User name</span>
          </AvatarBody>
        </Avatar>
      </div>
    </header>
  );
}
