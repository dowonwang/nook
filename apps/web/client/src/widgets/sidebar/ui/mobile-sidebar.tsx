'use client';

import { cn } from '@packages/ui/lib/cn';

import { AppLogo } from '$shared/ui/app-logo';
import { AppName } from '$shared/ui/app-name';

import { MENU_DATA } from '../config/menu-data';
import { Menu } from './menu/menu';
import { SidebarToggleButton } from './toggle-button';
import { useScrollLock } from '../lib/use-scroll-lock';
import { useSidebarContext } from '../model/context';

export function MobileSidebar() {
  const { isOpen } = useSidebarContext();

  useScrollLock(isOpen);

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-50 flex h-dvh w-full flex-col pb-8',
        'bg-sidebar/80 border-border border-r backdrop-blur-md',
        'overflow-y-auto',
        { hidden: !isOpen },
      )}
    >
      <div className='border-border min-h-header h-header bg-sidebar/80 sticky top-0 left-0 flex items-center gap-3 border-b px-5 backdrop-blur-md'>
        <AppLogo height={36} width={36} />
        <AppName />

        <SidebarToggleButton className='ml-auto' type='CLOSE' />
      </div>

      <Menu data={MENU_DATA} />
    </aside>
  );
}
