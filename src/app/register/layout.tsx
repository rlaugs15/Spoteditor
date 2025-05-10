import { Header2 } from '@/components/common/Header';
import { PropsWithChildren } from 'react';

const RegisterLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col max-w-[724px] mx-auto h-dvh">
      <Header2 />
      <div className="grow px-4 bg-white">{children}</div>
    </div>
  );
};

export default RegisterLayout;
