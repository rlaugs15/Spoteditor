'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '../Icons';

interface BackButtonProps {
  circle?: boolean;
}

const BackButton = ({ circle }: BackButtonProps) => {
  const router = useRouter();
  const handleClick = () => router.back();
  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      onClick={handleClick}
      className={cn(circle && 'rounded-full bg-white/70')}
    >
      <ArrowLeftIcon />
    </Button>
  );
};

export default BackButton;
