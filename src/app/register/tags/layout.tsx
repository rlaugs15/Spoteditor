import { Header2 } from '@/components/common/Header';
import { PropsWithChildren } from 'react';

const TagsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full flex flex-col">
      <Header2 />
      {children}
    </div>
  );
};

export default TagsLayout;
