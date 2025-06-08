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
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  const addFile = (file: Blob) => {
    const url = URL.createObjectURL(file);
    setPreviews((prev) => [...prev, { file, url }]);
  };

  const removeByFile = (file: Blob) => {
    setPreviews((prev) => {
      const target = prev.find((p) => p.file === file);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.file !== file);
    });
  };

  return {
    previews,
    addFile,
    removeByFile,
    reset: () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
      setPreviews([]);
    },
  };
};

export default useMultipleImagePreview;
