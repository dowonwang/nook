import { MenuItem } from './menu-item';

import type { MenuData } from '../../model/menu';

export function Menu({ data }: { data: MenuData[] }) {
  return (
    <nav className='flex-1 space-y-3 px-3 py-4'>
      {data.map((menu) => (
        <MenuItem key={menu.href} {...menu} />
      ))}
    </nav>
  );
}
