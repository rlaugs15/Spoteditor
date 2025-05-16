import { Tables } from '../supabase';
import { ApiResponse, PaginationParams } from './common';

/* (property) data: {
    address: string | null;
    category: string | null;
    created_at: string;
    description: string | null;
    log_id: string | null;
    name: string | null;
    place_id: string;
    updated_at: string | null;
} */

/* return {
      place_id: boolmark.place_id, // bigint to number
      log_id: place?.log?.log_id,
      nickname: place?.log?.users?.nickname,
      name: place?.name,
      description: place?.description,
      address: place?.address,
      category: place?.category,
      image: place?.place_images,
      created_at: place?.created_at,
      updated_at: place?.updated_at,
    }; */

export interface Place {
  place_id: string;
  log_id: string | null;
  nickname: string | null;
  name: string;
  description: string;
  address: string;
  category: string;
  image: {
    image_path: string | null;
    order: number | null;
    place_id: string | null;
    place_image_id: number;
  };
  created_at: string;
  updated_at: string;
}

export type PlaceReseponse = ApiResponse<Place[]>;

export interface PlaceBookmarkListParmas extends PaginationParams {
  userId: string;
}

export interface PlaceBookmarkParams {
  placeId: string;
  isBookmark: boolean;
}

export interface PlaceBookmarkResponse {
  success: boolean;
}
