'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import React from 'react';

interface TagButtonProps {
  value: string;
  isSelected: boolean;
  namespace: string;
  onClick: (value: string) => void;
}

const TagButton = ({ value, isSelected, namespace, onClick }: TagButtonProps) => {
  const t = useTranslations(namespace);
  return (
    <Button
      variant={isSelected ? 'default' : 'outline'}
      className="!text-text-xs font-bold border"
      onClick={() => onClick(value)}
    >
      {t(value)}
    </Button>
  );
};

export default React.memo(TagButton);
