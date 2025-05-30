import { cn } from '@/lib/utils';
import { memo } from 'react';

interface TextCounterProps {
  length: number;
  maxLength: number;
}

export default memo(function TextCounter({ length, maxLength }: TextCounterProps) {
  return (
    <span
      className={cn(
        'text-text-2xs font-pretendard',
        length > 30 ? 'text-red-500' : 'text-light-300'
      )}
    >
      {length}/{maxLength}
    </span>
  );
});
