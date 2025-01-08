import type { FC, MouseEventHandler, PropsWithChildren } from 'react';

import { useToggleWithValue } from '@hooks/useToggle';
import { navbarItems } from '@src/utils/menu-actions';
import { Tabs } from './Tabs';
import { useSessionStore } from "@src/store";
import { MenuProfile } from "@components/MenuProfile.tsx";
import { LoginDialog } from "@components/LoginDialog.tsx";

type Props = PropsWithChildren

export const Navbar: FC<Props> = () => {
  const isActiveSession = useSessionStore(state => state.isActiveSession)
  const [menuAppMobile, toggleMenuAppMobile] = useToggleWithValue<string, MouseEventHandler<HTMLButtonElement>>('hidden', 'block');

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
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {<Tabs
                  items={navbarItems}
                  typeComponent='NavLinkRRD'
                  classList={{
                    default: 'rounded-md px-3 py-2 text-sm font-medium',
                    whenIsActive: 'text-white bg-gray-900',
                    whenNotActive: 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }}
                />}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              {isActiveSession ? <MenuProfile /> : <LoginDialog />}
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
              whenIsActive: 'text-white bg-gray-900',
              whenNotActive: 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }}
          />}
        </div>
      </div>
    </nav>

  )
}