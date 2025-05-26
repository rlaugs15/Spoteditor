import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type PostCardLocationProps = Partial<{
  city: string;
  country: string;
  sigungu?: string;
  category?: string;
}> & {
  modal?: boolean;
};

function PostCardLocation({ city, country = '', sigungu, category, modal }: PostCardLocationProps) {
  return (
    <h4
      className={cn(
        'flex items-center text-text-sm web:text-text-md text-light-300 gap-2',
        modal && '!text-text-xs'
      )}
    >
      {category ? (
        <span>{category}</span>
      ) : (
        <>
          <span>{city}</span>
          <span>{country}</span>

          <span>
            {sigungu && (
              <>
                <div className="h-3 inline-block align-middle">
                  <Separator orientation="vertical" className="h-3 bg-light-300" />
                </div>
                <span className="ml-1">{sigungu}</span>
              </>
            )}
          </span>
        </>
      )}
    </h4>
  );
}

export default PostCardLocation;
