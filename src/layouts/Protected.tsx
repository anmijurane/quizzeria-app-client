import { FC, PropsWithChildren } from "react"

import { Navbar } from "@src/components/Navbar";

type Props = PropsWithChildren

export const ProtectedLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {children}
      </div>
    </>
  )
}
