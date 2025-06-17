'use client';
import { TAG_SETS } from '@/constants/tagData';
import { TagKeys, useLogCreationStore } from '@/stores/logCreationStore';
import TagGroup from './TagGroup';

interface MultiTagGroupProps {
  title?: string;
  type: Extract<TagKeys, 'mood' | 'activity'>;
}

const MultiTagGroup = ({ title, type }: MultiTagGroupProps) => {
  const selectedTags = useLogCreationStore((state) => state[type]);
  const toggleMultiTag = useLogCreationStore((state) => state.toggleMultiTag);
  const handleTagClick = (value: string) => toggleMultiTag(type, value);
  const isTagSelected = (value: string) =>
    Array.isArray(selectedTags) && selectedTags.includes(value);

  return (
    <TagGroup
      title={title}
      tags={TAG_SETS[type]}
      isSelected={isTagSelected}
      onTagClick={handleTagClick}
    />
  );
};

export default MultiTagGroup;
