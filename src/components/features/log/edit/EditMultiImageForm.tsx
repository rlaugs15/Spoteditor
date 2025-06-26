'use client';
import { XRemovePlaceImageIcon } from '@/components/common/Icons';
import { LogEditFormValues } from '@/types/log';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

interface EditMultiImageFormProps {
  idx: number;
}

const EditMultiImageForm = ({ idx }: EditMultiImageFormProps) => {
  const t = useTranslations('Register.LogPage');
  const { control, setValue, getValues } = useFormContext<LogEditFormValues>();
  const { fields, remove } = useFieldArray({
    control: control,
    name: `places.${idx}.placeImages`,
  });

  const handleDeleteClick = (imageIdx: number) => {
    if (fields.length === 1) return toast.error(`${t('imageDeleteLimit')}`);

    const deletedImagePath = fields[imageIdx].place_image_id; // 선 추출 후 빼기
    remove(imageIdx);
    const prevDeletedImgs = getValues('deletedPlaceImages') ?? [];
    setValue('deletedPlaceImages', [...prevDeletedImgs, deletedImagePath], {
      shouldDirty: true,
    });
  };

  return (
    <div className="flex max-h-[320px] overflow-x-auto gap-1 scrollbar-hide web:scrollbar-default scrollbar-thin my-2.5">
      {fields.map((field, imageIdx) => {
        const url = getStoragePublicImage(field.image_path);
        return (
          <div key={field.id} className="relative w-[220px] h-[300px] shrink-0">
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
