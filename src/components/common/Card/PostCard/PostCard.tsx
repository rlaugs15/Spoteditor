import { LogWithUserAndAddress } from '@/types/api/common';
import Link from 'next/link';
import LogBookMarkButton from '../../Button/Bookmark/LogBookMarkButton';
import PostCardImage from './PostCardImage';
import PostCardLocation from './PostCardLocation';
import PostCardTitle from './PostCardTitle';

// const LogBookMarkButton = dynamic(
//   () => import('@/components/common/Button/Bookmark/LogBookMarkButton'),
//   { ssr: false }
// );

interface PostCardProps {
  log: LogWithUserAndAddress;
  vertical?: boolean;
  modal?: boolean;
}

const PostCard = ({ log, vertical, modal }: PostCardProps) => {
  return (
    <div className="cursor-pointer relative">
      <Link href={`log/${log?.log_id}`}>
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
