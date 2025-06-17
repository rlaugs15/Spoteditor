import { cn } from '@/lib/utils';
import ModalOverlay from './ModalOverlay';
import ModalWrapper from './ModalWrapper';

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModalContent({ children, className }: ModalContentProps) {
  return (
    <ModalWrapper>
      <ModalOverlay>
        <div
          className={cn(
            'w-full h-full web:max-w-[520px] web:h-[470px] p-4 web:p-5 bg-white web:rounded-[12px] flex flex-col items-center',
            className
          )}
        >
          {children}
        </div>
      </ModalOverlay>
    </ModalWrapper>
  );
}
