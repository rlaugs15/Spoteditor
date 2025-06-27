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

  // 태그 타입에 따른 네임스페이스 설정
  const namespace = type === 'mood' || type === 'activity' ? 'MoodTags' : '';

  return (
    <TagGroup
      title={title}
      tags={TAG_SETS[type]}
      isSelected={isTagSelected}
      onTagClick={handleTagClick}
      namespace={namespace}
    />
  );
};

export default MultiTagGroup;
