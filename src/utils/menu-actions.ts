import { MenuActions } from '@interfaces/menu-actions';

export const navbarItems: MenuActions[] = [
  {
    label: 'home',
    to: '/',
  },
];

export const profileMenuActions:MenuActions[] = [
  {
    label: 'edit profile',
    secondaryLabel: '(comming soon)',
    toAction: () => alert('funcionalidad Proximamente'),
    disable: false,
  },
  {
    label: 'logout',
    //TODO: create a implementation close session with backend
    toAction: () => alert('Cerrar Session')
  }
];
