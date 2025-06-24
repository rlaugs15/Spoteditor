import loadingAnimation from '@/app/assets/loadingAnimation.json';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

interface LoadingProps {
  className?: string;
}

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
