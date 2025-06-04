'use client';
import {
  cityCategories,
  cityDistricts,
  globalCategories,
  globalRegions,
} from '@/constants/cityData';
import { TAG_SETS } from '@/constants/tagData';
import { MultiKeys, TagKeys, useLogCreationStore } from '@/stores/logCreationStore';
import { useCallback, useMemo } from 'react';
import TagButton from './TagButton';

interface TagGroupProps {
  title: string;
  type: TagKeys;
}

const MULTI_TAG_TYPES = new Set<TagKeys>(['mood', 'activity']);
const DOMESTIC_COUNTRY = '국내';

const isMultiType = (key: TagKeys): key is MultiKeys => MULTI_TAG_TYPES.has(key);

const TagGroup = ({ title, type }: TagGroupProps) => {
  const selectedTags = useLogCreationStore((state) => state[type]);
  const toggleMultiTag = useLogCreationStore((state) => state.toggleMultiTag);
  const setSingleTag = useLogCreationStore((state) => state.setSingleTag);
  const selectedCity = useLogCreationStore((state) => state['city']);
  const selectedCountry = useLogCreationStore((state) => state['country']);
  const isDomestic = selectedCountry === DOMESTIC_COUNTRY;

  const tags = useMemo(() => {
    switch (type) {
      case 'sigungu':
        return isDomestic ? cityDistricts[selectedCity] : globalRegions[selectedCity];
      case 'city':
        return isDomestic ? cityCategories : globalCategories;
      default:
        return TAG_SETS[type];
    }
  }, [type, selectedCity, isDomestic]);

  const handleTagClick = useCallback(
    (value: string) => {
      if (isMultiType(type)) toggleMultiTag(type, value);
      else setSingleTag(type, value);
    },
    [setSingleTag, toggleMultiTag, type]
  );

  const isTagSelected = useCallback(
    (value: string) => {
      return isMultiType(type)
        ? Array.isArray(selectedTags) && selectedTags.includes(value)
        : selectedTags === value;
    },
    [type, selectedTags]
  );

  return (
    <div className="mb-5">
      <h5 className="text-text-xs font-bold py-2.5">{title}</h5>
      <div className="flex flex-wrap gap-2">
        {tags.map((value: string) => (
          <TagButton
            key={value}
            value={value}
            isSelected={isTagSelected(value)}
            onClick={handleTagClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TagGroup;
