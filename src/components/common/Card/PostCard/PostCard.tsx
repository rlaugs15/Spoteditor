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
}

const PostCard = ({ log, vertical }: PostCardProps) => {
  return (
    <div className="cursor-pointer relative">
      <PostCardImage
        lable
        author={String(log?.users?.nickname)}
        imageUrl={log?.thumbnail_url}
        vertical={vertical}
      />
      <PostCardTitle title={String(log?.title)} />
      <PostCardLocation city={log?.address[0]?.city} sigungu={log?.address[0]?.sigungu} />
      <LogBookMarkButton logId={String(log?.log_id)} />
    </div>
  );
};

export default PostCard;
