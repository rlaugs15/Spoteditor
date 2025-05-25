'use client';

import LogBookMarkButton from '@/components/common/Button/Bookmark/LogBookMarkButton';
import MotionCard from '@/components/common/Card/MotionCard';
import {
  PostCardImage,
  PostCardLocation,
  PostCardTitle,
  PostCardWrapper,
} from '@/components/common/Card/PostCard';
import CustomPagination from '@/components/common/CustomPagination';
import Loading from '@/components/common/Loading/Loading';
import ProfileFallbackMessage from '@/components/features/profile/fallback/ProfileFallbackMessage';
import useLogsBookmark from '@/hooks/queries/log/useLogsBookmark';
import usePagination from '@/hooks/usePagination';
import Link from 'next/link';

interface SavaLogsProps {
  userId: string;
}

export default function SaveLogs({ userId }: SavaLogsProps) {
  const { currentPage, handlePageChange } = usePagination();

  const { data, isPending } = useLogsBookmark({
    userId,
    currentPage: Number(currentPage),
  });
  return (
    <>
      {isPending ? (
        <Loading className="min-h-[350px]" />
      ) : data?.data.length !== 0 ? (
        <>
          <PostCardWrapper className="mb-[50px]">
            {data?.data.map((log) => (
              <MotionCard key={log?.log_id} className="relative group">
                <Link href={`/log/${log?.log_id}`} className="hover:cursor-default">
                  <PostCardImage
                    lable
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
            ))}
          </PostCardWrapper>
          <section className="mt-[50px]">
            <CustomPagination
              currentPage={currentPage}
              totalPages={data?.meta?.pagination?.totalPages ?? 1}
              onChangePage={handlePageChange}
            />
          </section>
        </>
      ) : (
        <ProfileFallbackMessage resourceName="로그" />
      )}
    </>
  );
}
