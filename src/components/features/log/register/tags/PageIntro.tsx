'use client';

import { TagKeys, useLogCreationStore } from '@/stores/logCreationStore';

interface PageIntro {
  type: Extract<TagKeys, 'mood' | 'country' | 'city' | 'sigungu'>;
}

const PAGE_INTROS = {
  mood: { title: '어떤 하루인가요?', des: '여러개를 선택할 수 있어요 (최대 6개)' },
  country: { title: '국가를 선택해주세요.', des: '메인 국가를 선택해주세요.' },
  city: {
    domestic: {
      title: '도시를 선택해주세요.',
      des: '메인 도시를 선택해주세요.',
    },
    aboard: {
      title: '지역을 선택해주세요.',
      des: '메인 지역을 선택해주세요.',
    },
  },
  sigungu: {
    domestic: {
      title: '시/군/구를 선택해주세요.',
      des: '메인 시/군/구를 선택해주세요.',
    },
    aboard: {
      title: '도시를 선택해주세요.',
      des: '메인 도시를 선택해주세요.',
    },
  },
};

const PageIntro = ({ type }: PageIntro) => {
  const country = useLogCreationStore((state) => state.country); // 국내 | 국외
  const isDomestic = country === '국내';

  const intro =
    type === 'mood' || type === 'country'
      ? PAGE_INTROS[type]
      : PAGE_INTROS[type][isDomestic ? 'domestic' : 'aboard'];

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h3 className="text-md text-light-900 font-bold">{intro.title}</h3>
      <p className="text-text-sm font-medium text-light-300">{intro.des}</p>
    </div>
  );
};

export default PageIntro;
