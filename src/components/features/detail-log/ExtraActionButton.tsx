import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

interface ExtraActionButtonProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

const ExtraActionButton = ({ children, className, onClick }: ExtraActionButtonProps) => {
  return (
    <Button
      size={'icon'}
      className={cn(
        'flex items-center justify-center bg-white/70 border border-light-100 w-9 h-9 rounded-full',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ExtraActionButton;
