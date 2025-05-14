import { PaginationParams } from './common';

export interface FollowParams extends Pick<PaginationParams, 'currentPage' | 'pageSize'> {
  userId: string;
}
