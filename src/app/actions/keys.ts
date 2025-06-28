import { PaginationParams } from '@/types/api/common';
import { FollowListParams } from '@/types/api/follow';
import { logBookmarkListParams, LogsParams } from '@/types/api/log';
import { SearchParams } from '@/types/api/search';

// ============================================================================
// 유저 관련 쿼리키
// ============================================================================
export const userKeys = {
  all: ['user'] as const,

  // 현재 로그인한 유저 정보
  me: () => [...userKeys.all, 'me'] as const,

  // 특정 유저 공개 프로필 정보
  publicUser: (userId: string) => [...userKeys.all, 'public', userId] as const,
};

// ============================================================================
// 팔로우 관련 쿼리키
// ============================================================================
export const followKeys = {
  all: ['follow'] as const,

  // 특정 유저 팔로우 관련 정보
  publicUser: (userId: string) => [...followKeys.all, 'user', userId] as const,

  // 팔로우 상태 확인 (특정 유저를 팔로우하고 있는지)
  status: (userId: string) => [...followKeys.publicUser(userId), 'status'] as const,

  // 팔로워 목록 (나를 팔로우하는 사람들)
  follower: (userId: string) => [...followKeys.publicUser(userId), 'followers'] as const,
  followerList: (params: FollowListParams) =>
    [
      ...followKeys.follower(params.userId),
      `page-${params.currentPage}`,
      `size-${params.pageSize}`,
    ] as const,

  // 팔로잉 목록 (내가 팔로우하는 사람들)
  following: (userId: string) => [...followKeys.publicUser(userId), 'followings'] as const,
  followingList: (params: FollowListParams) =>
    [
      ...followKeys.following(params.userId),
      `page-${params.currentPage}`,
      `size-${params.pageSize}`,
    ] as const,
};

// ============================================================================
// 로그 관련 쿼리키
// ============================================================================
export const logKeys = {
  all: ['log'] as const,

  // 특정 로그 상세 정보
  detail: (logId: string) => [...logKeys.all, 'detail', logId] as const,

  // 로그 목록 (전체)
  list: (params: LogsParams) =>
    [
      ...logKeys.all,
      'list',
      `page-${params.currentPage}`,
      `size-${params.pageSize}`,
      `sort-${params.sort || 'latest'}`,
    ] as const,

  // 특정 유저 로그 목록
  listByUser: ({ userId, currentPage = 1, pageSize = 10 }: LogsParams) =>
    [...logKeys.all, 'byUser', userId ?? '', `page-${currentPage}`, `size-${pageSize}`] as const,

  // 북마크된 로그 목록
  bookmarkList: ({ userId, currentPage, pageSize }: logBookmarkListParams) =>
    [
      ...logKeys.all,
      'bookmarks',
      `user-${userId}`,
      `page-${currentPage}`,
      `size-${pageSize}`,
    ] as const,

  // 특정 로그 북마크 상태
  bookmarkStatus: (logId: string, userId: string) =>
    [...logKeys.all, 'bookmark-status', logId, `user-${userId}`] as const,
};

// ============================================================================
// 장소 관련 쿼리키
// ============================================================================
export const placeKeys = {
  all: ['place'] as const,

  // 특정 장소 상세 정보
  detail: (placeId: string) => [...placeKeys.all, 'detail', placeId] as const,

  // 장소 목록
  list: ({ currentPage = 1, pageSize = 10 }: PaginationParams) =>
    [...placeKeys.all, 'list', `page-${currentPage}`, `size-${pageSize}`] as const,

  // 북마크된 장소 목록
  bookmarkList: ({ userId, currentPage, pageSize }: logBookmarkListParams) =>
    [
      ...placeKeys.all,
      'bookmarks',
      `user-${userId}`,
      `page-${currentPage}`,
      `size-${pageSize}`,
    ] as const,

  // 특정 장소 북마크 상태
  bookmarkStatus: (placeId: string, userId: string) =>
    [...placeKeys.all, 'bookmark-status', placeId, `user-${userId}`] as const,
};

// ============================================================================
// 검색 관련 쿼리키
// ============================================================================
export const searchKeys = {
  all: ['search'] as const,

  // 검색 결과 목록
  list: (params: SearchParams) =>
    [
      ...searchKeys.all,
      'results',
      `page-${params.currentPage ?? 1}`,
      `size-${params.pageSize ?? 10}`,
      `sort-${params.sort ?? 'latest'}`,
      `keyword-${params.keyword ?? ''}`,
      `city-${params.city ?? ''}`,
      `sigungu-${params.sigungu ?? ''}`,
    ] as const,
};
