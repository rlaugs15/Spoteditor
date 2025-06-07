import { cn } from '@/lib/utils';

interface FallbackMessage {
  message: string;
  className?: string;
}

export default function FallbackMessage({ message, className = '' }: FallbackMessage) {
  return (
    <div className={cn('flex justify-center items-start py-[49px] min-h-[350px]', className)}>
      <h3 className="font-bold text-center text-text-sm text-primary-200">{message}</h3>
    </div>
  );
}
