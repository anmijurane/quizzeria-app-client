import { MenuActions } from '@interfaces/menu-actions';

export const navbarItems: MenuActions[] = [
  {
    label: 'Inicio',
    to: '/',
  },
  {
    label: 'Preguntas',
    to: '/questions',
  },
];

export const profileMenuActions:MenuActions[] = [
  {
    label: 'Editar perfil',
    secondaryLabel: '(Proximamente)',
    toAction: () => alert('funcionalidad Proximamente'),
    disable: false,
  },
  {
    label: 'Cerrar sesion',
    //TODO: create a implementation close session with backend
    toAction: () => alert('Cerrar Session')
  }
];
