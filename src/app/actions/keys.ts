import { PaginationParams } from '@/types/api/common';
import { FollowListParams } from '@/types/api/follow';
import { logBookmarkListParmas, LogsParams } from '@/types/api/log';
import { SearchParams } from '@/types/api/search';

/* 유저 */
export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  publicUser: (userId: string) => [...userKeys.all, 'public', userId] as const,
};

/* 팔로우 */
export const followKeys = {
  all: ['follow'] as const,

  publicUser: (userId: string) => [...followKeys.all, 'user', userId] as const,

  /* 상태 확인용(단일 팔로우) */
  status: (userId: string) => [...followKeys.publicUser(userId), 'status'] as const,

  /* 팔로워 목록 */
  follower: (userId: string) => [...followKeys.publicUser(userId), 'followers'] as const,
  followerList: (params: FollowListParams) =>
    [...followKeys.follower(params.userId), `${params.currentPage}`, `${params.pageSize}`] as const,

  /* 팔로잉 목록 */
  following: (userId: string) => [...followKeys.publicUser(userId), 'followings'] as const,
  followingList: (params: FollowListParams) =>
    [
      ...followKeys.following(params.userId),
      `${params.currentPage}`,
      `${params.pageSize}`,
    ] as const,
};

/* 로그 */
export const logKeys = {
  all: ['log'] as const,
  detail: (logId: string) => [...logKeys.all, logId] as const,
  list: (params: LogsParams) =>
    [
      ...logKeys.all,
      'list',
      `${params.currentPage}`,
      `${params.pageSize}`,
      `${params.sort}`,
    ] as const,
  listByUser: ({ userId, currentPage = 1, pageSize = 10 }: LogsParams) =>
    [...logKeys.all, 'byUser', userId ?? '', `${currentPage}`, `${pageSize}`] as const,
  bookmarkList: ({ userId, currentPage, pageSize }: logBookmarkListParmas) =>
    [...logKeys.all, 'bookmark', `${userId}`, `${currentPage}`, `${pageSize}`] as const,

  // 단일 로그 북마크
  bookmarkStatus: (logId: string, userId: string) =>
    [...logKeys.all, 'bookmark', 'status', logId, userId] as const,
};

/* 장소 */
export const placeKeys = {
  all: ['place'] as const,
  detail: (placeId: string) => [...placeKeys.all, placeId] as const,
  list: ({ currentPage = 1, pageSize = 10 }: PaginationParams) =>
    [...placeKeys.all, 'list', `${currentPage}`, `${pageSize}`] as const,
  bookmarkList: ({ userId, currentPage, pageSize }: logBookmarkListParmas) =>
    [...placeKeys.all, 'bookmark', `${userId}`, `${currentPage}`, `${pageSize}`] as const,

  // 단일 장소 북마크
  bookmarkStatus: (placeId: string, userId: string) =>
    [...placeKeys.all, 'bookmark', 'status', placeId, userId] as const,
};

export const searchKeys = {
  all: ['search'] as const,

  list: (params: SearchParams) =>
    [
      ...searchKeys.all,
      'list',
      String(params.currentPage ?? 1),
      String(params.pageSize ?? 10),
      params.sort ?? '',
      params.keyword ?? '',
      params.city ?? '',
      params.sigungu ?? '',
    ] as const,
};
