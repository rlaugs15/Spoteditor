export interface IUser {
  user_id: string;
  nickname: string | null;
  image_url: string | null;
  description: string | null;
  insta_id: string | null;
}

export interface PublicUser extends IUser {
  followerCount: number;
  followingCount: number;
}
