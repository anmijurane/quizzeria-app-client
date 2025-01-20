import { FC, PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
  when: boolean;
  fallback?: ReactNode;
}

export const Show: FC<Props> = ({ when, children, fallback }) => {
  return when ? children : fallback;
}
