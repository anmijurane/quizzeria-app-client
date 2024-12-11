import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren

export const LayoutGlobal: FC<Props> = ({ children }) => {

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {children}
    </div>
  )

}
