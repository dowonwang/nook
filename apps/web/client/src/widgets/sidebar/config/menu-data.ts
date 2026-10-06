import type { MenuData } from '../model/types';

export const MENU_DATA: MenuData[] = [
  { href: '/dashboard', title: 'dashboard.title' },
  { href: '/org', title: 'org.title' },
  // { href: '/drive', title: 'Drive' },
  // { href: '/collaborate', title: 'Collaborate' },
  // { href: '/setting', title: 'Settings' },
] as const;
