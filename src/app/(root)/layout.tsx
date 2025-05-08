import { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return <div className="h-dvh bg-pink-200 web:bg-yellow-300">{children}</div>;
};

export default MainLayout;
