import { cn } from '@/lib/utils';

interface PostCardWrapperProps {
  className?: string;
  children: React.ReactNode;
}

function PostCardWrapper({ className, children }: PostCardWrapperProps) {
  return (
    <section
      className={cn(
        'grid w-full grid-cols-1 web:grid-cols-4 web:gap-x-[15px] web:gap-y-10 mobile:gap-8.5',
        className
      )}
    >
      {children}
    </section>
  );
}

export default PostCardWrapper;
