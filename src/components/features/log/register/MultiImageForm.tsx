'use client';
import { AddCameraIcon } from '@/components/common/Icons';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useGpsAddressExtraction } from '@/hooks/useGpsAddressExtraction';
import useMultipleImagePreview from '@/hooks/useMultipleImagePreview';
import { cn } from '@/lib/utils';
import { compressImageToWebp } from '@/utils/compressImageToWebp';
import { Reorder } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import ReorderItem from './ReorderItem';

interface MultiImageFormProps {
  idx: number;
  fieldName?: string;
}

const MAX_IMAGES_LENGTH = 8;

const MultiImageForm = ({ idx, fieldName }: MultiImageFormProps) => {
  const { control, setValue, getValues } = useFormContext<any>();
  const t = useTranslations('Register.LogPage');
  const tToast = useTranslations('Toast.logCreate');
  const { fields, append, remove, replace } = useFieldArray({
    control: control,
    name: fieldName ? `${fieldName}.placeImages` : `places.${idx}.placeImages`,
  });

  const { addFile, removeByFile, getPreviewUrl } = useMultipleImagePreview();

  // GPS 추출 훅 사용
  const placeAddressFieldName = fieldName ? `${fieldName}` : `places.${idx}.placeName`;
  const currentAddress = getValues(`${placeAddressFieldName}.location`);

  const { extractGpsAndSetAddress } = useGpsAddressExtraction({
    onAddressSet: (address: string) => setValue(`${placeAddressFieldName}.location`, address),
    currentAddress,
    onSkip: () => toast.info(tToast('autoAddressSkipped')),
  });

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    if (fields.length >= MAX_IMAGES_LENGTH) {
      toast.error(t('maxImageError'));
      return;
    }
    if (fileList.length >= MAX_IMAGES_LENGTH) toast.info(t('maxImageError'));

    const files = Array.from(fileList).slice(0, MAX_IMAGES_LENGTH - fields.length);

    // GPS 정보 추출 및 주소 자동 설정
    await extractGpsAndSetAddress(files);

    const compressedFiles = await Promise.all(files.map((file) => compressImageToWebp(file)));

    compressedFiles
      .filter((compressedImg) => compressedImg !== undefined)
      .forEach((compressedImg) => {
        addFile(compressedImg);
        append({ file: compressedImg });
      });
  };

  const handleRemove = (index: number, file: Blob) => {
    if (file instanceof Blob) removeByFile(file);
    remove(index);
  };

  const handleReorder = (newOrder: typeof fields) => {
    // reorderPreviews(newOrder.map((item) => (item as any).file));
    replace(newOrder);
  };

  return (
    <div className="flex flex-col">
      <FormLabel htmlFor={`file-upload-${idx}`}>
        <div className="image-upload-button border-dashed ">
          <AddCameraIcon />
          <span>
            {t('uploadPictures')}
            <span className="text-error-500">*</span> ({t('uploadPicturesLimit')})
          </span>
        </div>
      </FormLabel>
      <Input
        id={`file-upload-${idx}`}
        type="file"
        onChange={handleChangeFile}
        className="hidden"
        multiple
        maxLength={8}
        accept=".jpg,.jpeg,.png,.webp,.avif"
      />

      <div
        className={cn(
          'overflow-x-auto overflow-y-hidden web:scrollbar-thin',
          fields.length && 'mb-2.5'
        )}
        style={{
          touchAction: 'pan-x',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <Reorder.Group axis="x" values={fields} onReorder={handleReorder} className="flex gap-1">
          {fields.map((field, imageIdx) => {
            const file = (field as any).file;
            const previewUrl = getPreviewUrl(file);

            return (
              <ReorderItem
                key={field.id}
                item={field}
                imageUrl={previewUrl}
                onDeleteClick={() => handleRemove(imageIdx, file)}
                imageIdx={imageIdx}
              />
            );
          })}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default MultiImageForm;
