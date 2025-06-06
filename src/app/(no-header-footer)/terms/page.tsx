import NoticeHeader from '@/components/features/notice/NoticeHeader';

export default function TermsPage() {
  return (
    <main className="flex justify-center w-full">
      <div className="max-w-[724px] w-full">
        <NoticeHeader title="이용약관" />
        <section className="px-4 py-10 text-text-sm text-light-600">이용약관</section>
      </div>
    </main>
  );
}
