import { SearchParams } from '@/types/api/search';
import { followKeys, logKeys, placeKeys, searchKeys, userKeys } from './keys';

export const cacheTags = {
  // 캐시키 배열을 문자열로 변환
  fromKey: (key: readonly (string | number)[]) => key.join(':'),

  /* 유저 */
  me: () => cacheTags.fromKey(userKeys.me()),
  publicUser: (userId: string) => cacheTags.fromKey(userKeys.publicUser(userId)),

  /* 팔로우 */
  follower: (userId: string) => cacheTags.fromKey([...followKeys.follower(userId), 'single']),
  followerList: (userId: string) => cacheTags.fromKey([...followKeys.follower(userId), 'list']),
  following: (userId: string) => cacheTags.fromKey([...followKeys.following(userId), 'single']),
  followingList: (userId: string) => cacheTags.fromKey([...followKeys.following(userId), 'list']),

  /* 로그 */
  logDetail: (logId: string) => cacheTags.fromKey([...logKeys.detail(logId), 'single']),
  logList: () => cacheTags.fromKey([...logKeys.log, 'list']),
  logListByUser: (userId: string) => cacheTags.fromKey([...logKeys.log, 'byUser', userId, 'list']),
  logBookmarkList: (userId: string) =>
    cacheTags.fromKey([...logKeys.log, 'bookmark', userId, 'list']),
  logMyList: (userId: string) => cacheTags.fromKey([...logKeys.log, 'myList', userId, 'list']),

  /* 장소 */
  placeDetail: (placeId: string) => cacheTags.fromKey([...placeKeys.detail(placeId), 'single']),
  placeList: () => cacheTags.fromKey([...placeKeys.place, 'list']),
  placeBookmarkList: (userId: string) =>
    cacheTags.fromKey([...placeKeys.place, 'bookmark', userId, 'list']),

  /* 북마크 */
  placeBookmark: (placeId: string) =>
    cacheTags.fromKey([...placeKeys.detail(placeId), 'place_bookmark']),
  logBookmark: (logId: string) => cacheTags.fromKey([...logKeys.detail(logId), 'log_bookmark']),

  /* 검색 */
  searchList: (params: SearchParams) => cacheTags.fromKey(searchKeys.list(params)),
} as const;
