import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: 'nb-home',
    link: '/calendar/dashboard',
    home: true,
  },
  {
    title: "Log Out",
    icon: 'nb-auth',
    link: '/logout',
    home: false,
  }
];
