import { ApiResponse, PaginationParams } from './common';
import { IUserBase } from './user';

export interface FollowParams extends Partial<Pick<PaginationParams, 'currentPage' | 'pageSize'>> {
  userId: string;
}

export type Follower = Pick<IUserBase, 'user_id' | 'nickname' | 'image_url'>;

export type FollwersResponse = ApiResponse<Follower[]>;
