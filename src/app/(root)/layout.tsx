import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-dvw h-dvh flex flex-col">
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
