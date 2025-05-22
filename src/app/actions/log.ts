import { createClient } from '@/lib/supabase/server';
import { PaginationParams } from '@/types/api/common';
import { logBookmarkListParmas, LogResponse, LogsReseponse } from '@/types/api/log';
import { unstable_cache } from 'next/cache';
import { prisma } from 'prisma/prisma';
import { logKeys } from './keys';
import { cacheTags } from './tags';

// ===================================================================
// 단일 로그
// ===================================================================
export async function fetchLog(logId: string): Promise<LogResponse> {
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
}: PaginationParams): Promise<LogsReseponse> {
  const safePage = Math.max(1, currentPage);
  const safeSize = Math.min(Math.max(1, pageSize), 30);
  const skip = (safePage - 1) * safeSize; // 몇 개 건너뛸지 계산

  const logs = await prisma.log.findMany({
    skip, // 앞에서 몇 개 건너뛸지
    take: safeSize, // 가져올 데이터 수

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
  });

  // 전체 로그 수 카운트 (페이지 수 계산에 사용)
  const totalCount = await prisma.log.count();

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

export async function getLogs(params: PaginationParams) {
  return unstable_cache(() => fetchLogs(params), [...logKeys.list(params)], {
    tags: [cacheTags.logList()],
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
