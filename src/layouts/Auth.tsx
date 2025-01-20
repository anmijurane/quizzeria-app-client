import { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutGlobal } from './Global';
import { Navbar } from '@components/Navbar';

type Props = PropsWithChildren;

export const AuthLayout: FC<Props> = () => {
  return (
    <>
      <Navbar />
      <LayoutGlobal>
        <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8 shadow bg-white">
          <Outlet />
        </div>
      </LayoutGlobal>
    </>
  )
}
