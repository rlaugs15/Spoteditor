'use client';
import { AddCameraIcon } from '@/components/common/Icons';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useMultipleImagePreview from '@/hooks/useMultipleImagePreview';
import { LogFormValues } from '@/types/log';
import { compressImageToWebp } from '@/utils/compressImageToWebp';
import { Reorder } from 'motion/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import PlaceImage from '../common/PlaceImage';

interface MultiImageFormProps {
  idx: number;
}

const MAX_IMAGES_LENGTH = 8;

const MultiImageForm = ({ idx }: MultiImageFormProps) => {
  const { control } = useFormContext<LogFormValues>();
  const { fields, append, remove, replace } = useFieldArray({
    control: control,
    name: `places.${idx}.placeImages`,
  });

  const { addFile, removeByFile, reorderPreviews, getPreviewUrl } = useMultipleImagePreview();

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    if (fields.length >= MAX_IMAGES_LENGTH) {
      toast.error('사진은 최대 8장만 가능합니다.');
      return;
    }
    if (fileList.length >= MAX_IMAGES_LENGTH) toast.info('사진은 최대 8장만 가능합니다.');

    const files = Array.from(fileList).slice(0, MAX_IMAGES_LENGTH - fields.length);
    const compressedFiles = await Promise.all(files.map((file) => compressImageToWebp(file)));

    compressedFiles
      .filter((compressedImg) => compressedImg !== undefined)
      .forEach((compressedImg, i) => {
        addFile(compressedImg);
        append({ file: compressedImg, order: fields.length + i + 1 });
      });
  };

  const handleRemove = (index: number, file: Blob) => {
    if (file instanceof Blob) removeByFile(file);
    remove(index);
  };

  const handleReorder = (newOrder: typeof fields) => {
    reorderPreviews(newOrder.map((item) => item.file));
    const reorderedFields = newOrder.map((item, index) => {
      const original = fields.find((f) => f.id === item.id);
      return {
        ...original!,
        order: index + 1,
      };
    });

    replace(reorderedFields);
  };

  return (
    <div className="flex flex-col">
      <FormLabel htmlFor={`file-upload-${idx}`}>
        <div className="cursor-pointer text-text-sm w-full h-12 rounded-md flex items-center justify-center border border-dashed my-2.5 font-bold space-x-1.5 hover:bg-accent hover:text-accent-foreground">
          <AddCameraIcon />
          <span>
            사진 첨부<span className="text-error-500">*</span> (최대 8장)
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

      {fields.length > 0 && (
        <div className="overflow-x-auto mb-2.5 pb-1.5 web:scrollbar-thin">
          <Reorder.Group axis="x" values={fields} onReorder={handleReorder} className="flex gap-1">
            {fields.map((field, imageIdx) => {
              const file = field.file;
              const previewUrl = getPreviewUrl(file);

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
                  transition={{
                    type: 'spring',
                    stiffness: 600,
                    damping: 30,
                  }}
                >
                  <PlaceImage
                    imageUrl={previewUrl}
                    onDeleteClick={() => handleRemove(imageIdx, file)}
                    imageIdx={imageIdx}
                  />
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>
      )}
    </div>
  );
};

export default MultiImageForm;
