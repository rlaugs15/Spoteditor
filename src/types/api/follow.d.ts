import { ApiResponse, PaginationParams } from './common';
import { IUserBase } from './user';

export interface FollowParams {
  userId: string;
  isFollowing: boolean;
}

export interface FollowResponse {
  success: boolean;
  isFollowing: boolean;
}

export interface FollowListParams
  extends Partial<Pick<PaginationParams, 'currentPage' | 'pageSize'>> {
  userId: string;
}

export type Follower = Pick<IUserBase, 'user_id' | 'nickname' | 'image_url'>;
export type Following = Pick<IUserBase, 'user_id' | 'nickname' | 'image_url'>;

export type FollwersResponse = ApiResponse<Follower[]>;
