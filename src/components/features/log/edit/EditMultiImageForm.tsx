'use client';
import { XRemovePlaceImageIcon } from '@/components/common/Icons';
import { cn } from '@/lib/utils';
import { LogEditFormValues } from '@/types/schema/log';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface EditMultiImageFormProps {
  idx: number;
}

const EditMultiImageForm = ({ idx }: EditMultiImageFormProps) => {
  const { control } = useFormContext<LogEditFormValues>();
  const { fields, remove } = useFieldArray({
    control: control,
    name: `places.${idx}.placeImages`,
  });

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 max-h-[320px] overflow-x-auto gap-1">
        {fields.map((field, imageIdx) => {
          const url = getStoragePublicImage(field.image_path);
          return (
            <div key={field.id} className="relative w-[220px] h-[300px] my-2.5">
              <Image src={url} fill alt="업로드한 장소 이미지" className="object-cover" />
              <button onClick={() => remove(imageIdx)}>
                <XRemovePlaceImageIcon
                  className={cn(
                    'absolute top-2 right-2 cursor-pointer hover:brightness-90',
                    fields.length === 1 && 'hidden'
                  )}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditMultiImageForm;
