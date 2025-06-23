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
import ProfileFallbackMessage from '@/components/features/profile/fallback/ProfileFallbackMessage';
import useLogsBookmark from '@/hooks/queries/log/useLogsBookmark';
import useUser from '@/hooks/queries/user/useUser';
import usePagination from '@/hooks/usePagination';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';

interface SavaLogsProps {
  userId: string;
}

export default function SaveLogs({ userId }: SavaLogsProps) {
  const { data: me } = useUser();
  const { currentPage, handlePageChange } = usePagination();
  const t = useTranslations('ProfilePage');

  const { data, isPending, refetch } = useLogsBookmark({
    userId,
    currentPage: Number(currentPage),
  });

  if (data && !data.success) {
    throw Error(data.msg);
  }

  useEffect(() => {
    if (!me?.user_id) return;

    const revalidateAndRefetch = async () => {
      await revalidateBookmarkLogs();
      refetch();
    };

    revalidateAndRefetch();
  }, [me?.user_id, refetch]);

  if (isPending) {
    return <Loading className="min-h-[350px]" />;
  }
  if (data && (!data.success || data.data.length === 0)) {
    return <ProfileFallbackMessage resourceName={t('resource.log')} />;
  }
  return (
    <>
      <PostCardWrapper className="mb-[50px]">
        {data?.data.map((log) => (
          <MotionCard key={log?.log_id} className="relative group hover:cursor-default">
            <Link href={`/log/${log?.log_id}`}>
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
            <LogBookMarkButton logId={String(log?.log_id)} />
          </MotionCard>
        ))}
      </PostCardWrapper>
      {data?.success && data.meta?.pagination && (
        <section className="mt-[50px]">
          <CustomPagination
            currentPage={currentPage}
            totalPages={data?.meta.pagination.totalPages}
            onChangePage={handlePageChange}
          />
        </section>
      )}
    </>
  );
}
