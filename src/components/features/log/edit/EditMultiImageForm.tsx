'use client';
import { XRemovePlaceImageIcon } from '@/components/common/Icons';
import { LogEditFormValues } from '@/types/schema/log';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

interface EditMultiImageFormProps {
  idx: number;
}

const EditMultiImageForm = ({ idx }: EditMultiImageFormProps) => {
  const { control, setValue, getValues } = useFormContext<LogEditFormValues>();
  const { fields, remove } = useFieldArray({
    control: control,
    name: `places.${idx}.placeImages`,
  });

  const handleDeleteClick = (imageIdx: number) => {
    if (fields.length === 1) return toast.error('장소 이미지 1장은 필수입니다.');

    const deletedImagePath = fields[imageIdx].place_image_id; // 선 추출 후 빼기
    remove(imageIdx);
    const prevDeletedImgs = getValues('deletedPlaceImages') ?? [];
    setValue('deletedPlaceImages', [...prevDeletedImgs, deletedImagePath], {
      shouldDirty: true,
    });
  };

  return (
    <div className="flex web:grid web:grid-cols-3 max-h-[320px] overflow-x-auto gap-1 scrollbar-hide">
      {fields.map((field, imageIdx) => {
        const url = getStoragePublicImage(field.image_path);
        return (
          <div key={field.id} className="relative w-[220px] h-[300px] my-2.5 shrink-0">
            <Image src={url} fill alt="업로드한 장소 이미지" className="object-cover" />
            <button onClick={() => handleDeleteClick(imageIdx)}>
              <XRemovePlaceImageIcon className="absolute top-2 right-2 cursor-pointer hover:brightness-90" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EditMultiImageForm;
