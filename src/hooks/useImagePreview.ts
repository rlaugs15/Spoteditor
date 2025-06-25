'use client';
import { compressImageToWebp } from '@/utils/compressImageToWebp';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import { useCallback, useEffect, useState } from 'react';

interface ImagePreviewState {
  previewUrl: string | null;
  isLoading: boolean;
  error: string | null;
}
interface UseImagePreviewReturn extends ImagePreviewState {
  handleFileChange: (file: File) => Promise<File | null>;
  clearPreview: () => void;
}

/* 단일 이미지 */
const initialPreview = (initial: File | string | null): string | null => {
  if (typeof initial === 'string') return getStoragePublicImage(initial);
  return null;
};

const useImagePreview = (initial: File | string | null): UseImagePreviewReturn => {
  const [state, setState] = useState<ImagePreviewState>({
    previewUrl: initialPreview(initial), // 등록된 이미지
    isLoading: false,
    error: null,
  });
  const [objectUrl, setObjectUrl] = useState<string | null>(null); // 생성한 미리보기

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const handleFileChange = useCallback(
    async (file: File): Promise<File | null> => {
      try {
        setState((prev) => ({ ...prev, error: null, isLoading: true }));

        const compressed = await compressImageToWebp(file);
        if (!compressed) {
          setState((prev) => ({
            ...prev,
            error: '이미지 압축에 실패했습니다. 다시 시도해주세요.',
            isLoading: false,
          }));
          return null;
        }

        if (objectUrl) URL.revokeObjectURL(objectUrl);
        const url = URL.createObjectURL(compressed);
        setObjectUrl(url);
        setState((prev) => ({
          ...prev,
          previewUrl: url,
          isLoading: false,
        }));
        return compressed;
      } catch (error) {
        console.error('이미지 처리 중 오류:', error);
        setState((prev) => ({
          ...prev,
          error: '이미지 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
          isLoading: false,
        }));
        return null;
      }
    },
    [objectUrl]
  );

  const clearPreview = useCallback(() => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    setState((prev) => ({
      ...prev,
      previewUrl: null,
      error: null,
    }));
  }, [objectUrl]);

  return {
    ...state,
    handleFileChange,
    clearPreview,
  };
};

export default useImagePreview;
