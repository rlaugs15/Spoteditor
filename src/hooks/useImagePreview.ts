'use client';
import { compressImageToWebp } from '@/utils/compressImageToWebp';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import { useEffect, useState } from 'react';

/* 단일 이미지 */

const initalPreivew = (initial: File | string | null) => {
  if (typeof initial === 'string') return getStoragePublicImage(initial);
  return null;
};

const useImagePreview = (initial: File | string | null) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => initalPreivew(initial)); // 등록된 이미지
  const [objectUrl, setObjectUrl] = useState<string | null>(null); // 생성한 미리보기

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const handleFileChange = async (file: File): Promise<File | null> => {
    const compressed = await compressImageToWebp(file);
    if (!compressed) return null;

    if (objectUrl) URL.revokeObjectURL(objectUrl);
    const url = URL.createObjectURL(compressed);

    setObjectUrl(url);
    setPreviewUrl(url);
    return compressed;
  };

  const clearPreview = () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    setPreviewUrl(null);
  };

  return {
    previewUrl,
    handleFileChange,
    clearPreview,
  };
};

export default useImagePreview;
