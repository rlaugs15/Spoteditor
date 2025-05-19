import { Button } from '@/components/ui/button';
import React from 'react';

interface TagButtonProps {
  value: string;
  isSelected: boolean;
  onClick: (tag: string) => void;
}

const TagButton = ({ value, isSelected, onClick }: TagButtonProps) => {
  return (
    <Button
      variant={isSelected ? 'default' : 'outline'}
      className="!text-text-xs font-bold border"
      onClick={() => onClick(value)}
    >
      {value}
    </Button>
  );
};

export default React.memo(TagButton);
