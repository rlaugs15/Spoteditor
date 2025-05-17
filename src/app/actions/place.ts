import { PlaceBookmarkListParmas, PlaceReseponse } from '@/types/api/place';
import { prisma } from '../../../prisma/prisma';
import { logKeys } from './keys';
import { cacheTags } from './tags';
import { unstable_cache } from 'next/cache';

// ===================================================================
// 북마크 장소 리스트
// ===================================================================
export async function fetchBookmarkedPlaces({
  userId,
  currentPage = 1,
  pageSize = 10,
}: PlaceBookmarkListParmas): Promise<PlaceReseponse> {
  const safePage = Math.max(1, currentPage);
  const safeSize = Math.min(Math.max(1, pageSize), 30);
  const skip = (safePage - 1) * safeSize;

  const bookmarkedPlaces = await prisma.place_bookmark.findMany({
    where: { user_id: userId },
    skip,
    take: pageSize,
    orderBy: {
      place: {
        created_at: 'desc',
      },
    },
    include: {
      place: {
        select: {
          place_id: true,
          name: true,
          description: true,
          address: true,
          category: true,
          place_images: {
            orderBy: { order: 'asc' },
            take: 1, // 대표 이미지 한 장만
            select: {
              image_path: true,
              order: true,
              place_id: true,
              place_image_id: true,
            },
          },
          log: {
            select: {
              log_id: true,
              users: {
                select: {
                  user_id: true,
                  nickname: true, // 작성자 이름
                },
              },
            },
          },
        },
      },
    },
  });
  // 전체 로그북마크 수 카운트 (페이지 수 계산에 사용)
  const totalCount = await prisma.log_bookmark.count({
    where: { user_id: userId },
  });

  const filteredPlaces = bookmarkedPlaces.map((boolmark) => {
    const place = boolmark.place;
    const image = place?.place_images?.[0];
    return {
      place_id: place?.place_id?.toString() ?? '',
      log_id: place?.log?.log_id?.toString() ?? null,
      user: {
        user_id: place?.log?.users?.user_id ?? '',
        nickname: place?.log?.users?.nickname ?? null,
      },
      name: place?.name ?? '',
      description: place?.description ?? '',
      address: place?.address ?? '',
      category: place?.category ?? '',
      image: {
        image_path: image?.image_path ?? null,
        order: image?.order ?? null,
        place_id: image?.place_id?.toString() ?? null,
        place_image_id: image?.place_image_id ? Number(image.place_image_id) : 0,
      },
    };
  });
  return {
    data: filteredPlaces,
    meta: {
      pagination: {
        currentPage: safePage,
        pageSize: safeSize,
        totalPages: Math.ceil(totalCount / safeSize),
      },
      httpStatus: 200,
    },
  };
}

export async function getBookmarkedPlaces(params: PlaceBookmarkListParmas) {
  return unstable_cache(() => fetchBookmarkedPlaces(params), [...logKeys.bookmarkList(params)], {
    tags: [cacheTags.logBookmarkList(params.userId)],
    revalidate: 300,
  })();
}
