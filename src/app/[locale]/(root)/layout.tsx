import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { PropsWithChildren } from 'react';

interface MainLayoutProps extends PropsWithChildren {
  modal: React.ReactNode;
}

const MainLayout = ({ modal, children }: MainLayoutProps) => {
  return (
    <div className="w-full h-dvh flex flex-col font-pretendard web:min-w-[1440px]">
      {modal}
      <Header />
      <div className="grow pt-12 web:pt-[60px]">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
