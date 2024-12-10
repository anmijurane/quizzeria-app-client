import { FC, PropsWithChildren } from 'react';

import { useToggleWithValue } from '@hooks/useToggle';
import { navbarItems, profileMenuActions } from '@src/utils/menu-actions';
import { Tabs } from './Tabs';

type Props = PropsWithChildren

export const Navbar: FC<Props> = () => {

  const [profileMenu, toggleProfileMenu] = useToggleWithValue<string, React.MouseEventHandler<HTMLButtonElement>>('hidden', 'absolute');
  const [menuAppMobile, toggleMenuAppMobile] = useToggleWithValue<string, React.MouseEventHandler<HTMLButtonElement>>('hidden', 'block');

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Button mobile */}
            <button onClick={toggleMenuAppMobile} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

              <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Image Logo */}
            {/* <div className="flex shrink-0 items-center">
              <img className="h-8 w-auto" src="" alt="Logo app" />
            </div> */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {<Tabs
                  items={navbarItems}
                  typeComponent='NavLinkRRD'
                  classList={{
                    default: 'rounded-md px-3 py-2 text-sm font-medium',
                    whenisActive: 'text-white bg-gray-900',
                    whenIsntActive: 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }}
                />}
                {/* <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-white bg-gray-900" aria-current="page">Dashboard</a>
                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a> */}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button onClick={toggleProfileMenu} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  {/* image profile */}
                  {/* TODO: create a component with name */}
                  <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </button>
              </div>

              <div className={`${profileMenu} right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                <Tabs
                  items={profileMenuActions}
                  typeComponent='LinkRRD'
                  classList={{ default: 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200' }}
                />
                {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`sm:hidden ${menuAppMobile}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {<Tabs
            items={navbarItems}
            typeComponent='NavLinkRRD'
            classList={{
              default: 'block rounded-md px-3 py-2 text-base font-medium',
              whenisActive: 'text-white bg-gray-900',
              whenIsntActive: 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }}
          />}
        </div>
      </div>
    </nav>

  )
}