import AppLogo from '$components/app-logo';
import Menu from '$components/menu/menu';

import type { MenuData } from '$components/menu/menu';

const menuList: MenuData[] = [
  { href: '/', title: 'Dashboard' },
  { href: '/org', title: 'Organization' },
  { href: '/drive', title: 'Drive' },
  { href: '/collaborate', title: 'Collaborate' },
  { href: '/setting', title: 'Settings' },
] as const;

export default function AppSidebar() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'App';

  return (
    <aside className='bg-sidebar border-border w-active-sidebar flex h-dvh flex-col border-r'>
      <div className='border-border min-h-header h-header flex items-center gap-3 border-b px-5'>
        <AppLogo height={36} width={36} />
        <span className='text-lg font-semibold whitespace-nowrap'>
          {appName}
        </span>
      </div>

      <Menu data={menuList} />
    </aside>
  );
}
