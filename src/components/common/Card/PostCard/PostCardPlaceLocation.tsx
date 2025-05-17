import { Separator } from '@/components/ui/separator';
import { NullableFields } from '@/types/api/common';

type PostCardPlaceLocationProps = NullableFields<{
  address: string;
}>;

function PostCardPlaceLocation({ address }: PostCardPlaceLocationProps) {
  return (
    <h4 className="flex items-center text-text-sm web:text-text-md text-light-300">
      <span>{address}</span>
    </h4>
  );
}

export default PostCardPlaceLocation;
