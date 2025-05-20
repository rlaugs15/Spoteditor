import { Separator } from '@/components/ui/separator';
import { NullableFields } from '@/types/api/common';

type PostCardLocationProps = NullableFields<
  Partial<{
    city: string;
    country: string;
    sigungu: string;
    category?: string;
  }>
>;

function PostCardLocation({ city, country = '', sigungu, category }: PostCardLocationProps) {
  return (
    <h4 className="flex items-center text-text-sm web:text-text-md text-light-300 gap-2">
      {category ? (
        <span>{category}</span>
      ) : (
        <>
          <span>{city}</span>
          <div className="h-3">
            <Separator orientation="vertical" className="h-3 bg-light-300" />
          </div>
          <span>{`${country} ${sigungu}`}</span>
        </>
      )}
    </h4>
  );
}

export default PostCardLocation;
