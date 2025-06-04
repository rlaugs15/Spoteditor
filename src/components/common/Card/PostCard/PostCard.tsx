import { cn } from '@/lib/utils';
import { LogWithUserAndAddress } from '@/types/api/common';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import PostCardImage from './PostCardImage';
import PostCardLocation from './PostCardLocation';
import PostCardTitle from './PostCardTitle';

const LogBookMarkButton = dynamic(
  () => import('@/components/common/Button/Bookmark/LogBookMarkButton')
);

interface PostCardProps {
  log: LogWithUserAndAddress;
  vertical?: boolean;
  modal?: boolean;
  isLarge?: boolean;
}

const PostCard = ({ log, vertical, modal }: PostCardProps) => {
  return (
    <div className={cn('cursor-pointer relative h-full group')}>
      <Link href={`/log/${log?.log_id}`} className="flex flex-col h-full">
        <PostCardImage
          author={String(log?.users?.nickname)}
          imageUrl={log?.thumbnail_url}
          vertical={vertical}
        />
        <PostCardTitle title={String(log?.title)} modal={modal} />
        <PostCardLocation
          city={log?.address[0]?.city}
          sigungu={log?.address[0]?.sigungu}
          modal={modal}
        />
      </Link>
      <LogBookMarkButton logId={String(log?.log_id)} modal={modal} />
    </div>
  );
};

export default PostCard;
