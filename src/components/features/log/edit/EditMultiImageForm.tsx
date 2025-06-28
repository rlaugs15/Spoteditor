'use client';
import { cn } from '@/lib/utils';
import { LogEditFormValues } from '@/types/log';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import { Reorder } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import ReorderItem from '../register/ReorderItem';

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
    const updatedOrder = newOrder.map((field, index) => ({
      ...field,
      order: index + 1,
    }));

    replace(updatedOrder);
  };

  return (
    <div
      className={cn(
        'overflow-x-auto overflow-y-hidden web:scrollbar-thin',
        fields.length && 'my-2.5'
      )}
      style={{
        touchAction: 'pan-x',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <Reorder.Group axis="x" values={fields} onReorder={handleReorder} className="flex gap-1">
        {fields.map((field, imageIdx) => {
          const previewUrl = getStoragePublicImage(field.image_path);
          return (
            <ReorderItem
              key={field.id}
              item={field}
              imageUrl={previewUrl}
              onDeleteClick={() => handleRemove(imageIdx)}
              imageIdx={imageIdx}
            />
          );
        })}
      </Reorder.Group>
    </div>
  );
};

export default EditMultiImageForm;
