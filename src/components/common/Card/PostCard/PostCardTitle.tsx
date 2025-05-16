import { cn } from '@/lib/utils';

interface PostCardTitleProps {
  className?: string;
  title: string;
}

function PostCardTitle({ className, title }: PostCardTitleProps) {
  return (
    <h3
      className={cn('font-bold text-black text-text-sm web:text-text-lg web:mb-[3px]', className)}
    >
      {title}
    </h3>
  );
}

export default PostCardTitle;
