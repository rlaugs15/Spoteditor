'use client';
import { LogEditFormValues } from '@/types/log';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import { Reorder } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import PlaceImage from '../common/PlaceImage';

interface EditMultiImageFormProps {
  idx: number;
}

const EditMultiImageForm = ({ idx }: EditMultiImageFormProps) => {
  const t = useTranslations('Register.LogPage');
  const { control, setValue, getValues } = useFormContext<LogEditFormValues>();
  const { fields, remove, replace } = useFieldArray({
    control: control,
    name: `places.${idx}.placeImages`,
  });

  const handleRemove = (imageIdx: number) => {
    if (fields.length === 1) return toast.error(`${t('imageDeleteLimit')}`);

    const deletedImagePath = fields[imageIdx].place_image_id; // 선 추출 후 빼기
    remove(imageIdx);
    const prevDeletedImgs = getValues('deletedPlaceImages') ?? [];
    setValue('deletedPlaceImages', [...prevDeletedImgs, deletedImagePath], {
      shouldDirty: true,
    });
  };

  const handleReorder = (newOrder: typeof fields) => {
    // 새로운 순서에 맞게 order 필드 업데이트
    const updatedOrder = newOrder.map((field, index) => ({
      ...field,
      order: index + 1,
    }));

    replace(updatedOrder);
  };

  return (
    // <div className="flex max-h-[320px] bg-pink-300 overflow-x-auto gap-1 scrollbar-hide web:scrollbar-default scrollbar-thin my-2.5">
    <div
      className="overflow-x-auto my-2.5 web:scrollbar-thin"
      style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' }}
    >
      <Reorder.Group
        axis="x"
        values={fields}
        onReorder={handleReorder}
        className="flex gap-1"
        style={{ touchAction: 'pan-x' }}
      >
        {fields.map((field, imageIdx) => {
          const previewUrl = getStoragePublicImage(field.image_path);
          return (
            <Reorder.Item
              key={field.id}
              value={field}
              className="relative w-[220px] h-[300px] shrink-0 cursor-grab active:cursor-grabbing"
              whileDrag={{
                scale: 1.05,
                zIndex: 100,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                rotate: 2,
              }}
            >
              <PlaceImage
                imageUrl={previewUrl}
                onDeleteClick={() => handleRemove(imageIdx)}
                imageIdx={imageIdx}
              />
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
};

export default EditMultiImageForm;
