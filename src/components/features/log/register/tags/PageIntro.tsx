'use client';

import { TagKeys, useLogCreationStore } from '@/stores/logCreationStore';
import { PAGE_TAG_INTROS } from './constant';

interface PageIntro {
  type: Extract<TagKeys, 'mood' | 'country' | 'city' | 'sigungu'>;
}

const PageIntro = ({ type }: PageIntro) => {
  const country = useLogCreationStore((state) => state.country); // 국내 | 국외
  const isDomestic = country === '국내';

  const intro =
    type === 'mood' || type === 'country'
      ? PAGE_TAG_INTROS[type]
      : PAGE_TAG_INTROS[type][isDomestic ? 'domestic' : 'aboard'];

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h3 className="text-md text-light-900 font-bold">{intro.title}</h3>
      <p className="text-text-sm font-medium text-light-300">{intro.des}</p>
    </div>
  );
};

export default PageIntro;
