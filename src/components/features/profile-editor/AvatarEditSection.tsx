'use client';

import { PenIcon } from '@/components/common/Icons';
import UserImage from '@/components/common/UserImage';
import { useEffect, useRef, useState } from 'react';

interface AvatarEditSectionProps {
  imageUrl: string;
  onFileChange: (file: File | null) => void;
}

export default function AvatarEditSection({ imageUrl, onFileChange }: AvatarEditSectionProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => hiddenInputRef.current?.click();

  const initialImageUrl = imageUrl;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialImageUrl);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      onFileChange(file); // 상위에 알림
    } else {
      //이미지가 이미 있을 때 이미지를 새로 선택 안 할 경우 취소
      setImageFile(null); // 메모리 해제
      setImagePreview(initialImageUrl);
    }
  };

  //이미지 미리보기
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);

      // 미리보기가 있을 때만 클린업 함수로 메모리 해제
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [imageFile]);
  return (
    <section className="flex justify-center">
      <article className="relative">
        <UserImage imgSrc={imagePreview} quality={100} className="w-25 h-25" />
        <button
          type="button"
          onClick={handleImageClick}
          className="absolute bottom-0 right-0 flex justify-center items-center w-6.5 h-6.5 bg-white z-10 rounded-full border border-primary-100"
        >
          <PenIcon className="w-4 h-4 stroke-black" />
        </button>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.avif"
          id="image_url"
          onChange={handleFileChange}
          ref={hiddenInputRef}
          className="hidden"
        />
      </article>
    </section>
  );
}
