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
  modal?: boolean;
}

const PostCard = ({ log, vertical, modal }: PostCardProps) => {
  return (
    <div className="cursor-pointer relative">
      <PostCardImage
        lable={!modal}
        author={log.author.name}
        imageUrl={log.imageUrl}
        vertical={vertical}
      />
      <PostCardTitle title={log.title} modal={modal} />
      <PostCardLocation city={log.city} sigungu={log.sigungu} modal={modal} />
      <LogBookMarkButton logId={log.logId} userId={log.author.userId} modal={modal} />
    </div>
  );
};

export default PostCard;
