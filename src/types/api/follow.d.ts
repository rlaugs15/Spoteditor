import { PaginationParams } from './common';

export interface FollowParams extends Partial<Pick<PaginationParams, 'currentPage' | 'pageSize'>> {
  userId: string;
}
