'use client';
import { AddCameraIcon, XRemoveThumbnailIcon } from '@/components/common/Icons';
import { FormField, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useImagePreview from '@/hooks/useImagePreview';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

interface SingleImageFormProps {
  name: string;
  label?: string;
  edit?: boolean;
}

const SingleImageForm = ({ name, label, edit }: SingleImageFormProps) => {
  const { control, getValues } = useFormContext();
  const initialImage = getValues(name);
  const { previewUrl, handleFileChange, clearPreview } = useImagePreview(initialImage);

  return (
    <div className="flex flex-col">
      <FormLabel htmlFor="single-upload" className={cn(previewUrl && 'hidden')}>
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
        render={({ field: { onChange } }) => (
          <Input
            id="single-upload"
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const compressed = await handleFileChange(file);
              if (compressed) onChange(compressed);
            }}
            className="hidden"
            multiple
            maxLength={3}
            accept=".jpg,.jpeg,.png,.webp,.avif"
          />
        )}
      />
      <div className="flex max-h-[320px] overflow-x-auto gap-1">
        {previewUrl && (
          <div key={previewUrl} className="relative w-full h-[300px] mb-2.5">
            <Image src={previewUrl} fill alt="업로드한 장소 이미지" className="object-cover" />
            <button onClick={clearPreview} className={cn(edit && 'hidden')}>
              <XRemoveThumbnailIcon className="absolute top-2 right-2 cursor-pointer hover:brightness-90" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleImageForm;
