import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { PropsWithChildren } from 'react';

interface MainLayoutProps extends PropsWithChildren {
  modal: React.ReactNode;
}

const MainLayout = ({ modal, children }: MainLayoutProps) => {
  return (
    <div className="w-dvw h-dvh flex flex-col font-pretendard">
      {modal}
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
