import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { MenuActions } from '@interfaces/menu-actions';
import { useTranslation } from 'react-i18next';

type typeComponent = 'LinkRRD' | 'NavLinkRRD' | 'button';

interface Props {
  items: MenuActions[];
  typeComponent: typeComponent;
  classList?: {
    whenIsActive?: string;
    whenNotActive?: string;
    default: string
  };
}

export const Tabs: FC<Props> = ({ items, typeComponent, classList }) => {

  const { t } = useTranslation();

  const NavLinkCustom = (props: MenuActions) => props.disable ? null : (
    <NavLink
      to={props?.to || ''}
      className={({ isActive }) => `${classList?.default} ${isActive ? classList?.whenIsActive || '' : classList?.whenNotActive || ''}`}
    >
      {/* Implement toAction */}
      {t(props.label)}
    </NavLink>
  );

  const LinkCustom = (props: MenuActions) => props.disable ? null : (
    <Link
      to={props?.to || ''}
      className={classList?.default}
    >
      {/* Implement toAction */}
      {t(props.label)}
    </Link>
  )

  const listOfComponent = {
    ['LinkRRD']: (props: MenuActions) => <LinkCustom {...props} />,
    ['NavLinkRRD']: (props: MenuActions) => <NavLinkCustom {...props} />,
    ['button']: (props: MenuActions) => <button className={classList?.default} onClick={props.toAction}>{t(props.label)}</button>
  }

  const Component = listOfComponent[typeComponent];

  return items.map(item => (
    <Component key={item.label} {...item}></Component>
  ))
}
