import { PropsWithChildren } from 'react';

const LogWriteLayout = ({ children }: PropsWithChildren) => {
  return <div className="h-full">{children}</div>;
};

export default LogWriteLayout;
