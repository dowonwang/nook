import type { MenuData } from '../model/types';

export const MENU_DATA: MenuData[] = [
  { href: '/dashboard', title: 'dashboard.title' },
  {
    href: '/org',
    title: 'org.title',
    sub: [
      {
        href: '/org',
        title: 'org.list.title',
      },
      {
        href: '/org/receive',
        title: 'org.receive.title',
      },
      {
        href: '/org/sent',
        title: 'org.sent.title',
      },
    ],
  },
  // { href: '/drive', title: 'Drive' },
  // { href: '/collaborate', title: 'Collaborate' },
  // { href: '/setting', title: 'Settings' },
] as const;
