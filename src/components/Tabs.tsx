import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { MenuActions } from '@interfaces/menu-actions';

type typeComponent = 'LinkRRD' | 'NavLinkRRD';

interface Props {
  items: MenuActions[];
  typeComponent: typeComponent;
  classList?: {
    whenisActive?: string;
    whenIsntActive?: string;
    default: string
  };
}

export const Tabs: FC<Props> = ({ items, typeComponent, classList }) => {

  const NavlinkCustom = (props: MenuActions) => props.disable ? null : (
    <NavLink
      to={props?.to || ''}
      className={({ isActive }) => `${classList?.default} ${isActive ? classList?.whenisActive || '' : classList?.whenIsntActive || ''}`}
    >
      {/* Implement toAction */}
      {props.label}
    </NavLink>
  );

  const LinkCustom = (props: MenuActions) => props.disable ? null : (
    <Link
      to={props?.to || ''}
      className={classList?.default}
    >
      {/* Implement toAction */}
      {props.label}
    </Link>
  )

  const listOfComponent = {
    ['LinkRRD']: (props: MenuActions) => <LinkCustom {...props} />,
    ['NavLinkRRD']: (props: MenuActions) => <NavlinkCustom {...props} />,
  }

  const Component = listOfComponent[typeComponent];

  return items.map(item => (
    <Component key={item.label} {...item}></Component>
  ))
}
