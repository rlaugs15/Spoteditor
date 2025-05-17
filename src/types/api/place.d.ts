import { Tables } from '../supabase';
import { ApiResponse, PaginationParams } from './common';

type IPlace = Pick<
  Tables<'place'>,
  'place_id' | 'log_id' | 'name' | 'description' | 'address' | 'category'
>;
type PlaceImage = Tables<'place_images'>;
type User = Pick<Tables<'users'>, 'nickname'>;

interface Place extends IPlace {
  user: User;
  image: PlaceImage;
}

export type PlaceReseponse = ApiResponse<Place[]>;

export interface PlaceBookmarkListParmas extends PaginationParams {
  userId: string;
}

export interface PlaceBookmarkParams {
  placeId: string;
  isBookmark: boolean;
}
