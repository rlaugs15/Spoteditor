'use client';

import PlaceBookMarkButton from '@/components/common/Button/Bookmark/PlaceBookMarkButton';
import MotionCard from '@/components/common/Card/MotionCard';
import {
  PostCardImage,
  PostCardPlaceLocation,
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

interface SavePlacesProps {
  userId: string;
}

export default function SavePlaces({ userId }: SavePlacesProps) {
  const { data: me } = useUser();
  const { currentPage, handlePageChange } = usePagination();

  const { data, isPending } = usePlacesBookmark({
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
            {data?.data.map((place) => (
              <MotionCard key={place.place_id} className="relative group">
                <Link href={`/log/${place.log_id}`}>
                  <PostCardImage
                    lable
                    author={place.user.nickname}
                    imageUrl={place.image.image_path}
                  />
                  <PostCardTitle title={place.name} />
                  <PostCardPlaceLocation address={place.address} />
                </Link>
                <PlaceBookMarkButton placeId={place.place_id} userId={String(me?.user_id)} />
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
        <ProfileFallbackMessage resourceName="장소" />
      )}
    </>
  );
}
