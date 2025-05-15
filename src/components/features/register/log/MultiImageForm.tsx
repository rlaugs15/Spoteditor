'use client';
import { AddCameraIcon, XRemovePlaceImageIcon } from '@/components/common/Icons';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LogFormValues } from '@/types/schema/log';
import { compressImageToWebp } from '@/utils/compressImageToWebp';
import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

interface MultiImageFormProps {
  idx: number;
}

const MAX_IMAGES_LENGTH = 3;

const MultiImageForm = ({ idx }: MultiImageFormProps) => {
  const { control } = useFormContext<LogFormValues>();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: `places.${idx}.placeImages`,
  });
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files; // 유사 배열 객체
    if (!fileList) return;

    if (fields.length >= MAX_IMAGES_LENGTH) {
      toast.error('사진은 최대 3장만 가능합니다.');
      return;
    }
    const files = Array.from(fileList).slice(0, MAX_IMAGES_LENGTH - fields.length);
    const compressedFiles = await Promise.all(files.map((file) => compressImageToWebp(file)));

    compressedFiles
      .filter((compressedImg) => compressedImg !== undefined)
      .forEach((compressedImg, idx) =>
        append({ file: compressedImg, order: fields.length + idx + 1 })
      );
  };

  return (
    <div className="flex flex-col">
      <FormLabel htmlFor={`file-upload-${idx}`}>
        <div className="cursor-pointer text-text-sm w-full h-12 rounded-md flex items-center justify-center border border-dashed my-2.5 font-bold space-x-1.5 hover:bg-accent hover:text-accent-foreground">
          <AddCameraIcon />
          <span>
            사진 첨부<span className="text-error-500">*</span> (최대 3장)
          </span>
        </div>
      </FormLabel>
      <Input
        id={`file-upload-${idx}`}
        type="file"
        onChange={handleChangeFile}
        className="hidden"
        multiple
        maxLength={3}
        accept=".jpg,.jpeg,.png,.webp,.avif"
      />
      <div className="flex max-h-[320px] overflow-x-auto gap-1">
        {fields.map((field, imageIdx) => {
          const file = field.file;
          const url = typeof file === 'string' ? file : URL.createObjectURL(file);
          return (
            <div key={field.id} className="relative w-[220px] h-[300px] mb-2.5">
              <Image src={url} fill alt="업로드한 장소 이미지" className="object-cover" />
              <button onClick={() => remove(imageIdx)}>
                <XRemovePlaceImageIcon className="absolute top-2 right-2 cursor-pointer hover:brightness-90" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiImageForm;
