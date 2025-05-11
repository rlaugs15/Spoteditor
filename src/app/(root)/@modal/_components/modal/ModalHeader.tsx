import { cn } from '@/lib/utils';

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModalHeader({ children, className }: ModalHeaderProps) {
  return <header className={cn('p-4 w-full flex justify-end', className)}>{children}</header>;
}
