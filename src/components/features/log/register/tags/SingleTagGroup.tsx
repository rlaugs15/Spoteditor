'use client';
import {
  cityCategories,
  cityDistricts,
  globalCategories,
  globalRegions,
} from '@/constants/cityData';
import { TAG_SETS } from '@/constants/tagData';
import { TagKeys, useLogCreationStore } from '@/stores/logCreationStore';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { PAGE_TAG_INTROS } from './constant';
import TagGroup from './TagGroup';

interface SingleTagGroupProps {
  title?: string;
  type: Extract<TagKeys, 'country' | 'city' | 'sigungu'>;
  nextPath?: string;
}

const SingleTagGroup = ({ title, type, nextPath }: SingleTagGroupProps) => {
  const router = useRouter();
  const selectedTag = useLogCreationStore((state) => state[type]);
  const setSingleTag = useLogCreationStore((state) => state.setSingleTag);
  const selectedCity = useLogCreationStore((state) => state['city']);
  const selectedCountry = useLogCreationStore((state) => state['country']);

  const isDomestic = selectedCountry === '국내';
  const tagGroupTitle =
    (type === 'city' || type === 'sigungu') &&
    PAGE_TAG_INTROS[type][isDomestic ? 'domestic' : 'aboard'].tagGroupTitle;

  const tags = useMemo(() => {
    switch (type) {
      case 'sigungu':
        if (!selectedCity) return [];
        return isDomestic ? cityDistricts[selectedCity] ?? [] : globalRegions[selectedCity] ?? [];
      case 'city':
        return isDomestic ? cityCategories : globalCategories;
      default:
        return TAG_SETS[type] ?? [];
    }
  }, [type, selectedCity, isDomestic]);

  const handleTagClick = useCallback(
    (value: string) => {
      setSingleTag(type, value);
      if (nextPath) router.push(nextPath);
    },
    [setSingleTag, type, nextPath, router]
  );

  return (
    <TagGroup
      title={title || String(tagGroupTitle)}
      tags={tags}
      isSelected={(value) => selectedTag === value}
      onTagClick={handleTagClick}
    />
  );
};

export default SingleTagGroup;
