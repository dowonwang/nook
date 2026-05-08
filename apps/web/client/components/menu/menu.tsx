import MenuItem from '$components/menu/menu-item';

export interface MenuData {
  href: string;
  title: string;
}

export default function Menu({ data }: { data: MenuData[] }) {
  return (
    <nav className='flex-1 space-y-3 px-3 py-4'>
      {data.map((menu) => (
        <MenuItem key={menu.href} {...menu} />
      ))}
    </nav>
  );
}
