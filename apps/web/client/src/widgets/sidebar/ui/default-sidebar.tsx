'use client';

import { clsx } from 'clsx';
import Link from 'next/link';

import { AppLogo, AppName } from '$shared/ui';

import { MENU_DATA } from '../config/menu-data';
import { Menu } from './menu/menu';

export function DefaultSidebar() {
  return (
    <aside
      className={clsx(
        'w-active-sidebar sticky top-0 left-0 hidden h-dvh flex-col md:flex',
        'bg-sidebar/80 border-border border-r backdrop-blur-md',
        'scrollbar-thumb-primary scrollbar-thin overflow-y-auto',
      )}
    >
      <Link
        href={'/dashboard'}
        className='border-border min-h-header h-header bg-sidebar/80 sticky top-0 left-0 flex items-center gap-3 border-b px-5 backdrop-blur-md'
      >
        <AppLogo height={36} width={36} />
        <AppName />
      </Link>

      <Menu data={MENU_DATA} />
    </aside>
  );
}
