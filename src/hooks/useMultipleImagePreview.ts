'use client';
import { useEffect, useState } from 'react';

type PreviewItem = {
  file: Blob;
  url: string;
};

const useMultipleImagePreview = () => {
  const [previews, setPreviews] = useState<PreviewItem[]>([]);

  useEffect(() => {
    return () => {
      setPreviews((prev) => {
        prev.forEach((p) => URL.revokeObjectURL(p.url));
        return [];
      });
    };
  }, []);

  /* 전달받은 파일의 미리보기 생성 */
  const addFile = (file: Blob) => {
    const url = URL.createObjectURL(file);
    setPreviews((prev) => [...prev, { file, url }]);
  };

  /* 지운 파일은 메모리 해제 */
  const removeByFile = (file: Blob) => {
    setPreviews((prev) => {
      const target = prev.find((p) => p.file === file);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.file !== file);
    });
  };

  const getPreviewUrl = (file: Blob | string): string => {
    if (typeof file === 'string') return file;

    // 미리보기가 만들어졌으면
    const preview = previews.find((p) => p.file === file);
    if (preview) return preview.url;

    // 미리보기가 없으면 새로 생성
    const url = URL.createObjectURL(file);
    setPreviews((prev) => [...prev, { file, url }]);
    return url;
  };

  return {
    previews,
    addFile,
    removeByFile,
    getPreviewUrl,
    reset: () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
      setPreviews([]);
    },
  };
};

export default useMultipleImagePreview;
