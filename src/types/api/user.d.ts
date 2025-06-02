export interface UserBase {
  user_id: string;
  nickname: string | null;
  image_url: string | null;
  description: string | null;
  insta_id: string | null;
  followerCount: number;
  followingCount: number;
}

export type IUser = UserBase | null;

export type PublicUser = UserBase | null;
