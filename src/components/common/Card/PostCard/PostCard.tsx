import LogBookMarkButton from '../../Button/Bookmark/LogBookMarkButton';
import PostCardImage from './PostCardImage';
import PostCardLocation from './PostCardLocation';
import PostCardTitle from './PostCardTitle';

interface PostCardProps {
  log: {
    logId: string;
    author: {
      name: string;
      userId: string;
    };
    imageUrl: string;
    title: string;
    city: string;
    sigungu: string;
  };
  vertical?: boolean;
}

const PostCard = ({ log, vertical }: PostCardProps) => {
  return (
    <div className="cursor-pointer">
      <PostCardImage lable author={log.author.name} imageUrl={log.imageUrl} vertical={vertical} />
      <PostCardTitle title={log.title} />
      <PostCardLocation city={log.city} sigungu={log.sigungu} />
      <LogBookMarkButton logId={log.logId} userId={log.author.userId} />
    </div>
  );
};

export default PostCard;
