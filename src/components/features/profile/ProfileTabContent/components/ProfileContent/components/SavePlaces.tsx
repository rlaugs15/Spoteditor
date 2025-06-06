'use client';

import { revalidateBookmarkPlaces } from '@/app/actions/place';
import PlaceBookMarkButton from '@/components/common/Button/Bookmark/PlaceBookMarkButton';
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
import usePlacesBookmark from '@/hooks/queries/place/usePlacesBookmark';
import useUser from '@/hooks/queries/user/useUser';
import usePagination from '@/hooks/usePagination';
import Link from 'next/link';
import { useEffect } from 'react';

interface SavePlacesProps {
  userId: string;
}

export default function SavePlaces({ userId }: SavePlacesProps) {
  const { data: me } = useUser();
  const { currentPage, handlePageChange } = usePagination();

  const { data, isPending, refetch } = usePlacesBookmark({
    userId,
    currentPage: Number(currentPage),
  });
  useEffect(() => {
    if (!me?.user_id) return;

    const revalidateAndRefetch = async () => {
      await revalidateBookmarkPlaces();
      refetch();
    };

    revalidateAndRefetch();
  }, [me?.user_id, refetch]);

  if (isPending) {
    return <Loading className="min-h-[350px]" />;
  }
  if (data && (!data.success || data.data.length === 0)) {
    return <ProfileFallbackMessage resourceName="장소" />;
  }
  return (
    <>
      <PostCardWrapper className="mb-[50px]">
        {data?.data.map((place) => (
          <MotionCard key={place.place_id} className="relative group hover:cursor-default">
            <Link href={`/log/${place.log_id}`}>
              <PostCardImage author={place.user.nickname} imageUrl={place.image.image_path} />
              <PostCardTitle title={place.name} />
              <PostCardLocation category={place.category} />
            </Link>
            <PlaceBookMarkButton placeId={place.place_id} />
          </MotionCard>
        ))}
      </PostCardWrapper>
      {data?.success && data.meta?.pagination && (
        <section className="mt-[50px]">
          <CustomPagination
            currentPage={currentPage}
            totalPages={data.meta.pagination.totalPages}
            onChangePage={handlePageChange}
          />
        </section>
      )}
    </>
  );
}
