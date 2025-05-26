'use client';
import { AddCameraIcon, XRemoveThumbnailIcon } from '@/components/common/Icons';
import { FormField, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { compressImageToWebp } from '@/utils/compressImageToWebp';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface SingleImageFormProps {
  name: string;
  label?: string;
}

const SingleImageForm = ({ name, label }: SingleImageFormProps) => {
  const { control, getValues } = useFormContext();
  const [preview, setPreview] = useState<string | null>(getValues(name) || null);
  const displayImage =
    typeof getValues(name) === 'string' ? getStoragePublicImage(preview as string) : preview;
  return (
    <div className="flex flex-col">
      <FormLabel htmlFor="single-upload" className={cn(preview && 'hidden')}>
        <div className="cursor-pointer text-text-sm w-full h-12 rounded-md flex items-center justify-center border border-dashed my-2.5 font-bold space-x-1.5 hover:bg-accent hover:text-accent-foreground">
          <AddCameraIcon />
          <span>
            {label || '이미지 업로드'}
            <span className="text-error-500">*</span>
          </span>
        </div>
      </FormLabel>
      <FormField
        control={control}
        name={name}
        render={({ field: { onChange, ref } }) => (
          <Input
            id="single-upload"
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const compressImg = await compressImageToWebp(file);

              if (compressImg) {
                onChange(compressImg);
                setPreview(URL.createObjectURL(compressImg));
              }
            }}
            className="hidden"
            multiple
            maxLength={3}
            accept=".jpg,.jpeg,.png,.webp,.avif"
            ref={ref}
          />
        )}
      />
      <div className="flex max-h-[320px] overflow-x-auto gap-1">
        {preview && (
          <div key={preview} className="relative w-full h-[300px] mb-2.5">
            <Image
              src={displayImage ?? ''}
              fill
              alt="업로드한 장소 이미지"
              className="object-cover"
            />
            <button onClick={() => setPreview(null)}>
              <XRemoveThumbnailIcon className="absolute top-2 right-2 cursor-pointer hover:brightness-90" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleImageForm;
