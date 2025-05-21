'use client';
import { cityDistricts } from '@/constants/cityData';
import { TAG_SETS } from '@/constants/tagData';
import { MultiKeys, TagKeys, useLogCreationStore } from '@/stores/logCreationStore';
import { useCallback } from 'react';
import TagButton from './TagButton';

interface TagGroupProps {
  title: string;
  type: TagKeys;
}

const isMultiType = (key: TagKeys): key is MultiKeys => {
  return key === 'mood' || key === 'activity';
};

const TagGroup = ({ title, type }: TagGroupProps) => {
  const selectedTags = useLogCreationStore((state) => state[type]);
  const toggleMultiTag = useLogCreationStore((state) => state.toggleMultiTag);
  const setSingleTag = useLogCreationStore((state) => state.setSingleTag);
  const selectedCity = useLogCreationStore((state) => state['city']);

  const tags = type === 'sigungu' ? cityDistricts[selectedCity] : TAG_SETS[type];
  const handleTagClick = useCallback((value: string) => {
    if (isMultiType(type)) toggleMultiTag(type, value);
    else setSingleTag(type, value);
  }, []);

  return (
    <div className="mb-5">
      <h5 className="text-text-xs font-bold py-2.5">{title}</h5>
      <div className="flex flex-wrap gap-2">
        {tags.map((value: string) => {
          const selected = isMultiType(type)
            ? (selectedTags as string[]).includes(value)
            : selectedTags === value;

          return (
            <TagButton key={value} value={value} isSelected={selected} onClick={handleTagClick} />
          );
        })}
      </div>
    </div>
  );
};

export default TagGroup;
