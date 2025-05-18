import { Separator } from '@/components/ui/separator';
import { NullableFields } from '@/types/api/common';

type PostCardLocationProps = NullableFields<{
  city: string;
  country: string;
  sigungu: string;
}>;

function PostCardLocation({ city, country, sigungu }: PostCardLocationProps) {
  return (
    <h4 className="flex items-center text-text-sm web:text-text-md text-light-300">
      <span>{city}</span>
      <div className="mx-2 h-3">
        <Separator orientation="vertical" className="h-3 bg-light-300" />
      </div>
      <span>{`${country} ${sigungu}`}</span>
    </h4>
  );
}

export default PostCardLocation;
