'use client';
import { AddCameraIcon, XRemovePlaceImageIcon } from '@/components/common/Icons';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useImageUpload from '@/hooks/useImageUpload';
import Image from 'next/image';

interface PhotoFormProps {
  thumbnail?: boolean;
  idx?: number;
}

const PhotoForm = ({ thumbnail, idx }: PhotoFormProps) => {
  const { previews, handleChange } = useImageUpload();
  // const { control } = useFormContext();
  // const { fields: imageFields, append: appendImage } = useFieldArray({
  //   control: control,
  //   name: `places.${idx}.placeImages`,
  // });
  return (
    <div className="flex flex-col">
      <FormItem>
        <FormLabel>
          <div className="cursor-pointer text-text-sm w-full h-12 rounded-md flex items-center justify-center border border-dashed my-2.5 font-bold space-x-1.5 hover:bg-accent hover:text-accent-foreground">
            <AddCameraIcon />
            {thumbnail ? (
              <span>
                커버이미지 <span className="text-error-500">*</span>
              </span>
            ) : (
              <span>
                사진 첨부<span className="text-error-500">*</span> (최대 3장)
              </span>
            )}
          </div>
        </FormLabel>
        <FormControl>
          <Input
            type="file"
            onChange={handleChange}
            className="hidden"
            multiple
            maxLength={3}
            accept=".jpg,.jpeg,.png,.webp,.avif"
          />
        </FormControl>
      </FormItem>
      <div className="flex max-h-[320px] overflow-x-auto gap-1">
        {previews &&
          previews.map((img) => (
            <div key={img} className="relative w-[220px] h-[300px] mb-2.5">
              <Image src={img} fill alt="업로드한 장소 이미지" className="object-cover" />
              <XRemovePlaceImageIcon className="absolute top-2 right-2 cursor-pointer hover:brightness-90" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhotoForm;
