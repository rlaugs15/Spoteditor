import { searchKeys } from '@/app/actions/keys';
import { getSearchLogs } from '@/app/actions/log';
import { getUser } from '@/app/actions/user';
import { SectionTitle } from '@/components/common/SectionBlock';
import SearchContent from '@/components/features/search/SearchContent';
import { getQueryClient } from '@/lib/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface SearchPageProps {
  searchParams: Promise<{ keyword: string; page: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { keyword, page } = await searchParams;
  const parsedPage = Number(page);
  const currentPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  const me = await getUser();

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: searchKeys.list({ keyword, currentPage, pageSize: 16 }),
    queryFn: () => getSearchLogs({ keyword, currentPage, pageSize: 16 }),
  });

  return (
    <div className="w-full pt-10 web:pt-15 pb-20 web:pb-35 px-4 web:px-12.5">
      <section className="pb-10 web:pb-15 border-b-[1px] border-b-light-100">
        <SectionTitle title="Searching for" subTitle={keyword} />
      </section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchContent userId={String(me?.user_id)} keyword={keyword} currentPage={currentPage} />
      </HydrationBoundary>
    </div>
  );
}
