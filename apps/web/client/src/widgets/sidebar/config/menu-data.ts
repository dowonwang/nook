import type { MenuData } from '../model/menu';

export const MENU_DATA: MenuData[] = [
  { href: '/dashboard', title: 'Dashboard' },
  { href: '/org', title: 'Organization' },
  { href: '/drive', title: 'Drive' },
  { href: '/collaborate', title: 'Collaborate' },
  { href: '/setting', title: 'Settings' },
] as const;
