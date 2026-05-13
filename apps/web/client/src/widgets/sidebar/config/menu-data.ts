import type { MenuData } from '$widgets/sidebar/ui/menu';

export const MENU_DATA: MenuData[] = [
  { href: '/dashboard', title: 'Dashboard' },
  { href: '/org', title: 'Organization' },
  { href: '/drive', title: 'Drive' },
  { href: '/collaborate', title: 'Collaborate' },
  { href: '/setting', title: 'Settings' },
] as const;
