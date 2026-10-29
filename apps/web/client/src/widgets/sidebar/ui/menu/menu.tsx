import { MenuItem } from './item';
import { SubMenuGroup } from './sub-group';

import type { MenuData } from '../../model/types';

export function Menu({ data }: { data: MenuData[] }) {
  return (
    <nav className='flex-1 space-y-3 px-3 py-4 text-sm'>
      {data.map((menu) => {
        if (menu.sub) {
          return <SubMenuGroup key={menu.href} {...menu} />;
        }

        return <MenuItem key={menu.href} {...menu} />;
      })}
    </nav>
  );
}
