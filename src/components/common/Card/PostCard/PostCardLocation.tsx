import { Separator } from '@/components/ui/separator';

interface PostCardLocationProps {
  sido: string;
  bname: string;
  sigungu: string;
}

function PostCardLocation({ sido, bname, sigungu }: PostCardLocationProps) {
  return (
    <h4 className="flex items-center text-text-sm web:text-text-md text-light-300">
      <span>{sido}</span>
      <div className="mx-2 h-3">
        <Separator orientation="vertical" className="h-3 bg-light-300" />
      </div>
      <span>{`${bname} ${sigungu}`}</span>
    </h4>
  );
}

export default PostCardLocation;
