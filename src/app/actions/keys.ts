import { PaginationParams } from '@/types/api/common';
import { FollowParams } from '@/types/api/follow';

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

  follower: (userId: string) => [...followKeys.publicUser(userId), 'followers'] as const,
  followerList: (params: FollowParams) =>
    [...followKeys.follower(params.userId), params.currentPage, params.pageSize] as const,

  following: (userId: string) => [...followKeys.publicUser(userId), 'followings'] as const,
  followingList: (params: FollowParams) =>
    [...followKeys.following(params.userId), params.currentPage, params.pageSize] as const,
};

/* 로그 */
export const logKeys = {
  log: ['log'] as const,
  detail: (logId: string) => [...logKeys.log, logId] as const,
  list: (params: PaginationParams) => [...logKeys.log, 'list', params] as const,
};

/* 장소 */
export const placeKeys = {
  place: ['place'] as const,
  detail: (placeId: string) => [...placeKeys.place, placeId] as const,
  list: (params: PaginationParams) => [...placeKeys.place, 'list', params] as const,
};

/* 북마크 */
export const bookmark = {
  placeBookMark: (placeId: string) => [...placeKeys.detail(placeId), 'place_bookmark'],
  logBookMark: (logId: string) => [...logKeys.detail(logId), 'log_bookmark'],
};
