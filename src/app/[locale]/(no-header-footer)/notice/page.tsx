import NoticeHeader from '@/components/features/notice/NoticeHeader';
import { getTranslations } from 'next-intl/server';

export default async function NoticePage() {
  const t = await getTranslations('NoticePage')
  return (
    <main className="flex justify-center w-full">
      <div className="max-w-[724px] w-full">
        <NoticeHeader title={t('title')} />
        {/* <NoticeList /> */}
      </div>
    </main>
  );
}
