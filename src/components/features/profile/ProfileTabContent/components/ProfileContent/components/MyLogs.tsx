'use client';

import { revalidateBookmarkLogs } from '@/app/actions/log';
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
import ProfileMyLogFallback from '@/components/features/profile/fallback/ProfileMyLogFallback';
import useLogs from '@/hooks/queries/log/useLogs';
import useUser from '@/hooks/queries/user/useUser';
import usePagination from '@/hooks/usePagination';
import Link from 'next/link';
import { useEffect } from 'react';

interface MyLogsProps {
  userId: string;
}

export default function MyLogs({ userId }: MyLogsProps) {
  const { currentPage, handlePageChange } = usePagination();
  const { data: me } = useUser();

  const { data, isPending, refetch } = useLogs({
    userId,
    currentPage: Number(currentPage),
  });
  useEffect(() => {
    if (!me?.user_id) return;

    const revalidateAndRefetch = async () => {
      await revalidateBookmarkLogs(String(me.user_id));
      refetch();
    };

    revalidateAndRefetch();
  }, [me?.user_id]);
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
                    author={String(log?.users?.nickname)}
                    imageUrl={String(log?.thumbnail_url)}
                  />
                  <PostCardTitle title={String(log?.title)} />
                  <PostCardLocation
                    city={String(log?.address[0]?.city)}
                    country={String(log?.address[0]?.country)}
                    sigungu={String(log?.address[0]?.sigungu)}
                  />
                </Link>
                {me?.user_id !== userId && <LogBookMarkButton logId={String(log?.log_id)} />}
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
        <ProfileMyLogFallback />
      )}
    </>
  );
}
