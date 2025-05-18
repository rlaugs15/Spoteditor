export interface IUserBase {
  user_id: string;
  nickname: string | null;
  image_url: string | null;
  description: string | null;
  insta_id: string | null;
}

export type IUser = IUserBase | null;

interface PublicUserBase extends IUserBase {
  followerCount: number;
  followingCount: number;
}
export type PublicUser = PublicUserBase | null;
