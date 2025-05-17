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
import ProfileMyLogFallback from '@/components/features/profile/fallback/ProfileMyLogFallback';
import Loading from '@/components/Loading';
import useLogsBookmark from '@/hooks/queries/log/useLogsBookmark';
import useUser from '@/hooks/queries/user/useUser';
import usePagination from '@/hooks/usePagination';
import Link from 'next/link';

interface MyLogsProps {
  userId: string;
}

export default function MyLogs({ userId }: MyLogsProps) {
  const { currentPage, handlePageChange } = usePagination();
  const { data: me } = useUser();

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
              <MotionCard key={log.log_id} className="relative group">
                <Link href={`/log/${log.log_id}`}>
                  <PostCardImage
                    lable
                    author={String(log.users.nickname)}
                    imageUrl={String(log.thumbnail_url)}
                  />
                  <PostCardTitle title={log.title} />
                  <PostCardLocation
                    city={log.address.city}
                    country={log.address.country}
                    sigungu={log.address.sigungu}
                  />
                </Link>
                {me?.user_id !== userId && (
                  <LogBookMarkButton logId={log.log_id} userId={String(me?.user_id)} />
                )}
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
