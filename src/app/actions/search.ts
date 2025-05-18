import { SearchParams, SearchReseponse } from '@/types/api/search';
import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import { prisma } from 'prisma/prisma';
import { searchKeys } from './keys';
import { cacheTags } from './tags';

// ===================================================================
// 검색 결과 로그 리스트
// ===================================================================
async function fetchSearch({
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
              { place: { name: { contains: keyword, mode: 'insensitive' } } },
              { address: { city: { contains: keyword, mode: 'insensitive' } } },
              { address: { sigungu: { contains: keyword, mode: 'insensitive' } } },
            ],
          }
        : undefined,
      city ? { address: { city: { equals: city } } } : undefined,
      sigungu ? { address: { sigungu: { contains: sigungu, mode: 'insensitive' } } } : undefined,
      // undefined 제거 + 타입 오류 방지
      // filter(Boolean)만으로는 타입이 좁혀지지 않기 때문에
      // 명시적으로 logWhereInput[]로 단언해줘야 타입스크립트 에러가 발생하지 않음
    ].filter(Boolean) as Prisma.logWhereInput[],
  };

  const searchData = await prisma.log.findMany({
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
  });

  const totalCount = await prisma.log.count({
    where: whereCondition,
  });

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

export async function getSearch(params: SearchParams) {
  return unstable_cache(() => fetchSearch(params), [...searchKeys.list(params)], {
    tags: [cacheTags.searchList(params)],
    revalidate: 300,
  })();
}
