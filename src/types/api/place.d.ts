import { Tables } from '../supabase';
import { ApiResponse, PaginationParams } from './common';

type IPlace = Pick<
  Tables<'place'>,
  'place_id' | 'log_id' | 'name' | 'description' | 'address' | 'category'
>;
type PlaceImage = Tables<'place_images'>;
type User = Pick<Tables<'users'>, 'nickname' | 'user_id'>;

interface Place extends IPlace {
  user: User;
  image: PlaceImage;
}

export type PlacesReseponse = ApiResponse<Place[]>;

export interface PlaceBookmarkListParmas extends PaginationParams {
  userId: string;
}

export interface PlaceBookmarkParams {
  placeId: string;
  isBookmark: boolean;
}

//사진 메타에이터 장소 타입
export type PhotoMetadataReseponse = ApiResponse<{ address: string }>;
