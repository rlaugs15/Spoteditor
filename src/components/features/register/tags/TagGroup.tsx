'use client';
import { cityDistricts } from '@/constants/cityData';
import { TAG_SETS } from '@/constants/tagData';
import { useCallback, useState } from 'react';
import TagButton from './TagButton';

interface TagGroupProps {
  title: string;
  type: keyof typeof TAG_SETS;
  selectedCity?: string;
}
const TagGroup = ({ title, type, selectedCity = '서울' }: TagGroupProps) => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const handleClick = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) newSet.delete(tag);
      else newSet.add(tag);
      return newSet;
    });
  }, []);

  const tags = type === 'sigungu' ? cityDistricts[selectedCity] : TAG_SETS[type];
  return (
    <div className="mb-5">
      <h5 className="text-text-xs font-bold py-2.5">{title}</h5>
      <div className="flex flex-wrap gap-2">
        {tags.map((value: string) => (
          <TagButton
            key={value}
            value={value}
            isSelected={selectedTags.has(value)}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TagGroup;
