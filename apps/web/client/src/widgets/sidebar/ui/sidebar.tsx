import AppLogo from '$shared/ui/app-logo';
import { MENU_DATA } from '$widgets/sidebar/config/menu-data';
import { Menu } from '$widgets/sidebar/ui/menu';

export function Sidebar() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'App';

  return (
    <aside className='bg-sidebar border-border w-active-sidebar flex h-dvh flex-col border-r'>
      <div className='border-border min-h-header h-header flex items-center gap-3 border-b px-5'>
        <AppLogo height={36} width={36} />
        <span className='text-lg font-semibold whitespace-nowrap'>
          {appName}
        </span>
      </div>

      <Menu data={MENU_DATA} />
    </aside>
  );
}
