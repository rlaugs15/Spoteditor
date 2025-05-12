export type IUser = Promise<{
  user_id: string;
  nickname: string | null;
  image_url: string | null;
  description: string | null;
  insta_id: string | null;
} | null>;
