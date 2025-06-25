'use client';
import {
  cityCategories,
  cityDistricts,
  globalCategories,
  globalRegions,
} from '@/constants/cityData';
import { TAG_SETS } from '@/constants/tagData';
import { TagKeys, useLogCreationStore } from '@/stores/logCreationStore';
import { useTranslations } from 'next-intl';
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
    [setSingleTag, type, nextPath]
  );

  // type에 따른 네임스페이스 분기
  const namespace = type === 'country' ? 'Register.CountryPage.options' : 'Region';

  let localeTitle = '';
  if (tagGroupTitle === '도시') {
    localeTitle = 'Register.CityPage.city';
  } else if (tagGroupTitle === '지역') {
    localeTitle = 'Register.CityPage.area';
  } else if (tagGroupTitle === '시/군/구') {
    localeTitle = 'Register.sigungu.sigungu';
  }
  const t = useTranslations();

  return (
    <TagGroup
      title={title || String(t(localeTitle))}
      tags={tags}
      isSelected={(value) => selectedTag === value}
      onTagClick={handleTagClick}
      namespace={namespace}
    />
  );
};

export default SingleTagGroup;
