import { cn } from '@/lib/utils';
import Image from 'next/image';
interface PostCardImageProps {
  imageUrl?: string | null;
  lable?: boolean;
  author: string | null;
  className?: string;
}

function PostCardImage({ imageUrl, lable, author, className }: PostCardImageProps) {
  return (
    <div
      className={cn(
        'relative flex-1 w-full group',
        className,
        'aspect-[1.5/1] overflow-hidden mb-1.5 web:mb-2.5'
      )}
    >
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt="Post Thumbnail"
            fill
            sizes="100%"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 card-id-gradient" />
          <div className="absolute inset-0 transition-colors group-hover:bg-black/25" />
        </>
      )}
      {lable && (
        <div className="flex items-center gap-[3px] absolute bottom-0 p-2.5 text-white">
          <span className="text-[11px] font-semibold leading-[130%] tracking-[-0.22px]">
            {author}
          </span>
        </div>
      )}
    </div>
  );
}

export default PostCardImage;
