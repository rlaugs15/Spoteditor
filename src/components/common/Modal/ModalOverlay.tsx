import { cn } from '@/lib/utils';

interface ModalOverlayProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModalOverlay({ children, className }: ModalOverlayProps) {
  return (
    <div
      className={cn(
        'backdrop-blur-[10px] bg-black/50 w-dvw h-dvh absolute top-0 left-0 z-60 web:flex web:justify-center web:items-center',
        className
      )}
    >
      {children}
    </div>
  );
}
