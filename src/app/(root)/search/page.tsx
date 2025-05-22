import { getUser } from '@/app/actions/user';
import { SectionTitle } from '@/components/common/SectionBlock';
import SearchContent from '@/components/features/search/SearchContent';

interface SearchPageProps {
  searchParams: {
    keyword: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const keyword = searchParams.keyword ?? '';
  const me = await getUser();
  return (
    <div className="w-full pt-10 web:pt-15 pb-20 web:pb-35 px-4 web:px-12.5">
      <section className="pb-10 web:pb-15 border-b-[1px] border-b-light-100">
        <SectionTitle title="Searching for" subTitle={keyword} />
      </section>
      <SearchContent userId={String(me?.user_id)} />
    </div>
  );
}
