'use client';

import LogBookMarkButton from '@/components/common/Button/Bookmark/LogBookMarkButton';
import MotionCard from '@/components/common/Card/MotionCard';
import { PostCardImage, PostCardLocation, PostCardTitle } from '@/components/common/Card/PostCard';
import CustomPagination from '@/components/common/CustomPagination';
import Loading from '@/components/common/Loading/Loading';
import { SectionTitle } from '@/components/common/SectionBlock';
import useSearchLogs from '@/hooks/queries/search/useSearchLogs';
import useQueryPagination from '@/hooks/useQueryPagination';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRef } from 'react';
interface SearchContentProps {
  keyword: string;
  currentPage: number;
}

export default function SearchContent({ keyword, currentPage }: SearchContentProps) {
  const contentRef = useRef<HTMLElement | null>(null);
  const t = useTranslations('SearchPage');

  const { handlePageChange } = useQueryPagination('page', currentPage, contentRef);
  const { data, isLoading } = useSearchLogs({ currentPage, keyword, pageSize: 16 });

  return (
    <section
      ref={contentRef}
      className="pt-10 web:pt-12.5 pb-12.5 flex flex-col gap-10 web:gap-12.5"
    >
      <div>
        {data && (!data?.success || !Array.isArray(data.data) || data.data.length === 0) ? (
          <p className="text-light-300 text-text-lg web:text-text-xl"> {t('result.empty')}</p>
        ) : (
          <div>
            <SectionTitle title="Sort by" subTitle="Popularity" />
            <div className="h-0 mt-[-32px] pt-[32px]" />
            <div className="flex flex-col gap-y-[34px] web:grid web:grid-cols-4 web:gap-x-[15px] web:gap-y-10 mt-6 web:mt-12.5 mb-12.5">
              {isLoading ? (
                <Loading />
              ) : (
                data?.data?.map((log) => (
                  <MotionCard key={log?.log_id} className="relative group">
                    <Link href={`/log/${log?.log_id}`}>
                      <PostCardImage
                        author={String(log?.users?.nickname)}
                        imageUrl={String(log?.thumbnail_url)}
                      />
                      <PostCardTitle title={String(log?.title)} />
                      <PostCardLocation
                        city={String(log?.address[0].city)}
                        country={String(log?.address[0].country)}
                        sigungu={String(log?.address[0].sigungu)}
                      />
                    </Link>
                    <LogBookMarkButton logId={String(log?.log_id)} />
                  </MotionCard>
                ))
              )}
            </div>
            {data?.success && data.meta?.pagination && (
              <CustomPagination
                currentPage={currentPage}
                totalPages={Number(data.meta.pagination.totalPages)}
                onChangePage={handlePageChange}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
