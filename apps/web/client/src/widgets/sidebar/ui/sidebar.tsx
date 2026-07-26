import { CLIENT_ENV_CONFIG } from '$shared/config/client';
import { AppLogo } from '$shared/ui';

import { MENU_DATA } from '../config/menu-data';
import { Menu } from './menu/menu';

export function Sidebar() {
  return (
    <aside className='bg-sidebar border-border w-active-sidebar flex h-dvh flex-col border-r'>
      <div className='border-border min-h-header h-header flex items-center gap-3 border-b px-5'>
        <AppLogo height={36} width={36} />
        <span className='text-lg font-semibold whitespace-nowrap'>
          {CLIENT_ENV_CONFIG.APP_NAME}
        </span>
      </div>

      <Menu data={MENU_DATA} />
    </aside>
  );
}
