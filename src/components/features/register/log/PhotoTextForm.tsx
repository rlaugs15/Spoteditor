import { AddCameraIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const PhotoTextForm = ({ cover }: { cover?: boolean }) => {
  return (
    <div className="flex flex-col gap-2.5">
      <Button
        variant={'outline'}
        className="w-full border-dashed text-text-sm font-bold"
        size={'xl'}
      >
        <AddCameraIcon />
        {cover ? (
          <span>
            커버이미지 <span className="text-error-500">*</span>
          </span>
        ) : (
          <span>
            사진 첨부<span className="text-error-500">*</span> (최대 3장)
          </span>
        )}
      </Button>
      <Textarea placeholder="내용을 입력해주세요. (최대 500자)" maxLength={500} />
    </div>
  );
};

export default PhotoTextForm;
