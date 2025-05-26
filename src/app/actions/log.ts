'use server';

import { createClient } from '@/lib/supabase/server';
import { stringifyQueryKey } from '@/lib/utils';
import { ActionResponse } from '@/types/api/common';
import { logBookmarkListParmas, LogResponse, LogsParams, LogsReseponse } from '@/types/api/log';
import { SearchParams, SearchReseponse } from '@/types/api/search';
import { Prisma } from '@prisma/client';
import { revalidateTag, unstable_cache } from 'next/cache';
import { prisma } from 'prisma/prisma';
import { logKeys, searchKeys } from './keys';
import { cacheTags } from './tags';

// ===================================================================
// 단일 로그
// ===================================================================
export async function fetchLog(logId: string): Promise<ActionResponse | LogResponse> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('log')
      .select(
        `
        *,
         place(*,
         place_images(*)
         ),
         log_tag(
          category, tag
         )
      `
      )
      .eq('log_id', logId)
      .single();

    if (error) throw new Error(error.message);
    return { success: true, data: data };
  } catch (e) {
    console.error(e);
    return { success: false, msg: '에러' };
  }
}

// ===================================================================
// 로그 리스트
// ===================================================================
async function fetchLogs({
  currentPage = 1,
  pageSize = 10,
  sort = 'latest',
  userId,
}: LogsParams): Promise<LogsReseponse> {
  const safePage = Math.max(1, currentPage);
  const safeSize = Math.min(Math.max(1, pageSize), 30);
  const skip = (safePage - 1) * safeSize; // 몇 개 건너뛸지 계산

  /* userId가 있을 경우 마이로그에서 쓸 로그리스트 반환 */
  const where = userId ? { user_id: userId } : undefined;

  const [logs, totalCount] = await Promise.all([
    prisma.log.findMany({
      skip, // 앞에서 몇 개 건너뛸지
      take: safeSize, // 가져올 데이터 수
      where,

      // 정렬 기준 설정: 인기순이면 북마크 개수 기준(연결된 테이블의 개수를 기준으로 정렬), 기본은 최신순
      orderBy: sort === 'popular' ? { log_bookmark: { _count: 'desc' } } : { created_at: 'desc' },
      select: {
        log_id: true,
        title: true,
        description: true,
        thumbnail_url: true,
        users: {
          select: {
            user_id: true,
            nickname: true,
          },
        },
        address: {
          select: {
            country: true,
            city: true,
            sigungu: true,
          },
        },
      },
    }),
    // 전체 로그 수 카운트 (페이지 수 계산에 사용)
    prisma.log.count({ where }),
  ]);

  return {
    success: true,
    data: logs,
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
}

export async function getLogs(params: LogsParams) {
  const { userId, currentPage = 1, pageSize = 10, sort = 'latest' } = params;

  const rawQueryKey = userId
    ? logKeys.listByUser({ userId, currentPage, pageSize })
    : logKeys.list({ currentPage, pageSize, sort });

  const queryKey = stringifyQueryKey(rawQueryKey);

  const tagKey = userId ? cacheTags.logListByUser(userId) : cacheTags.logList();

  return unstable_cache(() => fetchLogs(params), [...queryKey], {
    tags: [tagKey],
    revalidate: 300,
  })();
}

// ===================================================================
// 북마크 로그 리스트
// ===================================================================
export async function fetchBookmarkedLogs({
  userId,
  currentPage = 1,
  pageSize = 10,
}: logBookmarkListParmas): Promise<LogsReseponse> {
  const safePage = Math.max(1, currentPage);
  const safeSize = Math.min(Math.max(1, pageSize), 30);
  const skip = (safePage - 1) * safeSize;

  const bookmarkedLogs = await prisma.log_bookmark.findMany({
    where: { user_id: userId },
    skip,
    take: pageSize,
    orderBy: {
      log: {
        created_at: 'desc',
      },
    },
    include: {
      log: {
        select: {
          log_id: true,
          title: true,
          description: true,
          thumbnail_url: true,
          users: {
            select: {
              user_id: true,
              nickname: true,
            },
          },
          address: {
            select: {
              country: true,
              city: true,
              sigungu: true,
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

  //실제로 존재하는 log만 필터링, 예: 로그가 삭제된 북마크가 있을 경우
  const filterBookmarkedLogs = bookmarkedLogs.map((b) => b.log).filter(Boolean);
  return {
    success: true,
    data: filterBookmarkedLogs,
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
}

export async function getBookmarkedLogs(params: logBookmarkListParmas) {
  return unstable_cache(() => fetchBookmarkedLogs(params), [...logKeys.bookmarkList(params)], {
    tags: [cacheTags.logBookmarkList(params.userId)],
    revalidate: 300,
  })();
}

/* 북마크 시 서버캐시 무효화 */
export async function revalidateBookmarkLogs(userId: string) {
  revalidateTag(cacheTags.logBookmarkList(userId));
}

// ===================================================================
// 검색 결과 로그 리스트
// ===================================================================
async function fetchSearchLogs({
  keyword,
  city,
  sigungu,
  currentPage = 1,
  pageSize = 10,
  sort = 'latest',
}: SearchParams): Promise<SearchReseponse> {
  const safePage = Math.max(1, currentPage);
  const safeSize = Math.min(Math.max(1, pageSize), 30);
  const skip = (safePage - 1) * safeSize; // 몇 개 건너뛸지 계산

  const whereCondition = {
    AND: [
      keyword
        ? {
            OR: [
              { title: { contains: keyword, mode: 'insensitive' } },
              { place: { some: { name: { contains: keyword, mode: 'insensitive' } } } },
              {
                address: {
                  some: {
                    city: { contains: keyword, mode: 'insensitive' },
                  },
                },
              },
              {
                address: {
                  some: {
                    sigungu: { contains: keyword, mode: 'insensitive' },
                  },
                },
              },
            ],
          }
        : undefined,
      city
        ? {
            address: {
              some: {
                city: { equals: city },
              },
            },
          }
        : undefined,
      sigungu
        ? {
            address: {
              some: {
                sigungu: { contains: sigungu, mode: 'insensitive' },
              },
            },
          }
        : undefined,
      // undefined 제거 + 타입 오류 방지
      // filter(Boolean)만으로는 타입이 좁혀지지 않기 때문에
      // 명시적으로 logWhereInput[]로 단언해줘야 타입스크립트 에러가 발생하지 않음
    ].filter(Boolean) as Prisma.logWhereInput[],
  };

  const [searchData, totalCount] = await Promise.all([
    prisma.log.findMany({
      skip, // 앞에서 몇 개 건너뛸지
      take: safeSize, // 가져올 데이터 수
      where: whereCondition,

      // 정렬 기준 설정: 인기순이면 북마크 개수 기준(연결된 테이블의 개수를 기준으로 정렬), 기본은 최신순
      orderBy: sort === 'popular' ? { log_bookmark: { _count: 'desc' } } : { created_at: 'desc' },
      select: {
        log_id: true,
        title: true,
        description: true,
        thumbnail_url: true,
        users: {
          select: {
            user_id: true,
            nickname: true,
          },
        },
        address: {
          select: {
            country: true,
            city: true,
            sigungu: true,
          },
        },
      },
    }),
    prisma.log.count({
      where: whereCondition,
    }),
  ]);

  return {
    success: true,
    data: searchData,
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
}

export async function getSearchLogs(params: SearchParams) {
  return unstable_cache(() => fetchSearchLogs(params), [...searchKeys.list(params)], {
    tags: [cacheTags.searchList(params)],
    revalidate: 300,
  })();
}
