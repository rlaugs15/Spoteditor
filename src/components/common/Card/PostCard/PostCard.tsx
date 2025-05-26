import { LogWithUserAndAddress } from '@/types/api/common';
import dynamic from 'next/dynamic';
import PostCardImage from './PostCardImage';
import PostCardLocation from './PostCardLocation';
import PostCardTitle from './PostCardTitle';

const LogBookMarkButton = dynamic(
  () => import('@/components/common/Button/Bookmark/LogBookMarkButton'),
  { ssr: false }
);

interface PostCardProps {
  log: LogWithUserAndAddress;
  vertical?: boolean;
  modal?: boolean;
}

const PostCard = ({ log, vertical, modal }: PostCardProps) => {
  return (
    <div className="cursor-pointer relative">
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
      <LogBookMarkButton logId={String(log?.log_id)} modal={modal} />
    </div>
  );
};

export default PostCard;
