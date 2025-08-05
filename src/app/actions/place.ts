'use server';

import { ERROR_CODES } from '@/constants/errorCode';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { CACHE_REVALIDATE_TIME, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '@/constants/fetchConfig';
import {
  BookmarkPlace,
  Place,
  PlaceBookmarkListParmas,
  PlacesBookmarkReseponse,
  PlacesParams,
  PlacesReseponse,
} from '@/types/api/place';
import { getLocale } from 'next-intl/server';
import { revalidateTag, unstable_cache } from 'next/cache';
import prisma from 'prisma/prisma';
import { placeKeys } from './keys';
import { cacheTags, globalTags } from './tags';
import {
  getBookmarkedPlacesFindArgsEn,
  getBookmarkedPlacesFindArgsKo,
  getPlacesFindArgsEn,
  getPlacesFindArgsKo,
} from './utils/placeService';

// ===================================================================
// 장소 리스트
// ===================================================================

export async function fetchPlaces({
  currentPage = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  sort = 'latest',
}: PlacesParams): Promise<PlacesReseponse> {
  try {
    const locale = await getLocale();
    const isEn = locale === 'en';

    const safePage = Math.max(1, currentPage);
    const safeSize = Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE);
    const skip = (safePage - 1) * safeSize; // 몇 개 건너뛸지 계산

    //매핑 전 타입찾기
    let places: any[] = [];
    let totalCount: number = 0;

    if (isEn) {
      const placesFindArgs = getPlacesFindArgsEn({ skip, safeSize, sort });
      const [dbPlaces, dbTotalCount] = await Promise.all([
        prisma.place_en.findMany(placesFindArgs),
        // 전체 장소 수 카운트 (페이지 수 계산에 사용)
        prisma.place_en.count(),
      ]);

      places = dbPlaces.map((item) => {
        const log = item.log_en;

        return {
          place_id: item.place_id,
          name: item.name,
          place_images: item.place_images_en,
          log: log
            ? {
                users: log.users,
                address: log.address_en,
              }
            : null,
        };
      });
      totalCount = dbTotalCount;
    } else {
      const placesFindArgs = getPlacesFindArgsKo({ skip, safeSize, sort });
      const [dbPlaces, dbTotalCount] = await Promise.all([
        prisma.place.findMany(placesFindArgs),
        // 전체 장소 수 카운트 (페이지 수 계산에 사용)
        prisma.place.count(),
      ]);

      places = dbPlaces;
      totalCount = dbTotalCount;
    }

    const filteredPlaces: Place[] = places.map((place) => ({
      place_id: place.place_id?.toString() ?? '',
      log_id: place.log_id?.toString() ?? '',
      place_images: place.place_images[0].image_path?.toString() ?? '',
      name: place.name?.toString() ?? '',
      user: {
        user_id: place.log?.users.user_id?.toString() ?? '',
        nickname: place.log?.users.nickname?.toString() ?? '',
      },
      address: {
        country: place.log?.address[0].country?.toString() ?? '',
        city: place.log?.address[0].city?.toString() ?? '',
        sigungu: place.log?.address[0].sigungu?.toString() ?? '',
      },
    }));

    return {
      success: true,
      data: filteredPlaces,
      meta: {
        pagination: {
          currentPage: safePage,
          pageSize: safeSize,
          totalPages: Math.ceil(totalCount / safeSize),
          totalItems: totalCount,
        },
        httpStatus: 200,
      },
    };
  } catch (_error) {
    console.error(_error);
    return {
      success: false,
      msg: ERROR_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
      errorCode: ERROR_CODES.COMMON.INTERNAL_SERVER_ERROR,
    };
  }
}

export async function getPlaces(params: PlacesParams) {
  const queryKey = placeKeys.list(params);

  const tagKey = cacheTags.placeList(params);

  return unstable_cache(() => fetchPlaces(params), [...queryKey].filter(Boolean), {
    tags: [tagKey, globalTags.placeAll], // 상위 그룹 태그 추가
    revalidate: CACHE_REVALIDATE_TIME,
  })();
}

// ===================================================================
// 북마크 장소 리스트
// ===================================================================
export async function fetchBookmarkedPlaces({
  userId,
  currentPage = 1,
  pageSize = 12,
}: PlaceBookmarkListParmas): Promise<PlacesBookmarkReseponse> {
  try {
    const locale = await getLocale();
    const isEn = locale === 'en';

    const safePage = Math.max(1, currentPage);
    const safeSize = Math.min(Math.max(1, pageSize), 30);
    const skip = (safePage - 1) * safeSize;

    let bookmarkedPlaces: any[] = [];
    let totalCount = 0;

    if (isEn) {
      const bookmarkedPlacesFindArgs = getBookmarkedPlacesFindArgsEn({ userId, skip, pageSize });
      const [dbBookmarkedPlaces, dbTotalCount] = await Promise.all([
        prisma.place_bookmark_en.findMany(bookmarkedPlacesFindArgs),
        prisma.log_bookmark_en.count({
          where: { user_id: userId },
        }),
      ]);

      bookmarkedPlaces = bookmarkedPlaces = dbBookmarkedPlaces.map((item) => {
        const place = item.place_en;

        return {
          place_id: place.place_id,
          name: place.name,
          description: place.description,
          address: place.address,
          category: place.category,
          place_images: place.place_images_en,
          log: place.log_en
            ? {
                log_id: place.log_en.log_id,
                users: place.log_en.users,
              }
            : null,
        };
      });
      totalCount = dbTotalCount;
    } else {
      const bookmarkedPlacesFindArgs = getBookmarkedPlacesFindArgsKo({ userId, skip, pageSize });
      const [dbBookmarkedPlaces, dbTotalCount] = await Promise.all([
        prisma.place_bookmark.findMany(bookmarkedPlacesFindArgs),
        prisma.log_bookmark.count({
          where: { user_id: userId },
        }),
      ]);

      bookmarkedPlaces = dbBookmarkedPlaces;
      totalCount = dbTotalCount;
    }

    const filteredPlaces: BookmarkPlace[] = bookmarkedPlaces.map((boolmark) => {
      const place = boolmark.place;
      const image = place?.place_images?.[0];
      return {
        place_id: place?.place_id?.toString() ?? '',
        log_id: place?.log?.log_id?.toString() as string,
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
      success: true,
      data: filteredPlaces,
      meta: {
        pagination: {
          currentPage: safePage,
          pageSize: safeSize,
          totalPages: Math.ceil(totalCount / safeSize),
          totalItems: totalCount,
        },
        httpStatus: 200,
      },
    };
  } catch (_error) {
    console.error(_error);
    return {
      success: false,
      msg: ERROR_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
      errorCode: ERROR_CODES.COMMON.INTERNAL_SERVER_ERROR,
    };
  }
}

export async function getBookmarkedPlaces(params: PlaceBookmarkListParmas) {
  return unstable_cache(() => fetchBookmarkedPlaces(params), [...placeKeys.bookmarkList(params)], {
    tags: [
      cacheTags.placeBookmarkList(params), // 개별 사용자별 태그
      globalTags.placeAll, // 전체 북마크 무효화용 태그
    ],
    revalidate: 300,
  })();
}

/* 북마크 시 서버캐시 무효화 */
export async function revalidateBookmarkPlaces() {
  revalidateTag(globalTags.placeAll);
}
