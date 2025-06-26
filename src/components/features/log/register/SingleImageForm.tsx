'use client';
import { AddCameraIcon, XRemoveThumbnailIcon } from '@/components/common/Icons';
import Loading from '@/components/common/Loading/Loading';
import { FormField, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useImagePreview from '@/hooks/useImagePreview';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
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
  const { previewUrl, isLoading, handleFileChange, clearPreview } = useImagePreview(initialImage);

  const t = useTranslations('Register.LogPage');
  return (
    <div className="flex flex-col">
      <FormLabel htmlFor="single-upload" className={cn(previewUrl && 'hidden')}>
        <div
          className={cn(
            'cursor-pointer text-text-sm w-full h-12 rounded-md flex items-center justify-center border border-dashed my-2.5 font-bold space-x-1.5 hover:bg-accent hover:text-accent-foreground transition-colors',
            isLoading && 'cursor-not-allowed hover:bg-transparent'
          )}
          aria-disabled={isLoading}
        >
          {isLoading ? (
            <Loading className="w-26 h-inherit" />
          ) : (
            <>
              <AddCameraIcon />
              <span>
                {label || t('uploadImage')}
                <span className="text-error-500">*</span>
              </span>
            </>
          )}
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
            disabled={isLoading}
          />
        )}
      />

      {/* 이미지 미리보기 */}
      <div className="flex max-h-[320px] overflow-x-auto gap-1">
        {previewUrl && (
          <div key={previewUrl} className="relative w-full h-[300px] mb-2.5">
            <Image
              src={previewUrl}
              fill
              alt={t('uploadedImageAlt')}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <button
              onClick={clearPreview}
              className={cn(edit && 'hidden')}
              aria-label={t('removeImageAriaLabel')}
              type="button"
            >
              <XRemoveThumbnailIcon className="absolute top-2 right-2 cursor-pointer hover:brightness-90" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleImageForm;
