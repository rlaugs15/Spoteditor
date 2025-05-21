import PostCardImage from './PostCardImage';
import PostCardLocation from './PostCardLocation';
import PostCardTitle from './PostCardTitle';

interface PostCardProps {
  log: {
    author: string;
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
      <PostCardImage lable author={log.author} imageUrl={log.imageUrl} vertical={vertical} />
      <PostCardTitle title={log.title} />
      <PostCardLocation city={log.city} sigungu={log.sigungu} />
    </div>
  );
};

export default PostCard;
