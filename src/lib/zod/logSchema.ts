import { z } from 'zod';

// export const imageFileSchema = z.union([z.string(), z.instanceof(Blob)]);
export const imageFileSchema = z.instanceof(Blob);

export const PlaceimageSchema = z.object({
  file: imageFileSchema,
  order: z.number(),
});

export const placeSchema = z.object({
  placeName: z.string().min(1, '장소 이름은 필수입니다.'),
  category: z.string().min(1, '카테고리명은 필수입니다.'),
  location: z.string().min(1, '위치 정보 필수입니다.'),
  description: z.string().nullable(),
  placeImages: z
    .array(PlaceimageSchema)
    .max(3, { message: '최대 3장의 이미지만 업로드 가능합니다.' })
    .min(1, '장소 최소 1장은 필수입니다.'),
});

export const tagsSchema = z.object({
  mood: z.array(z.string()).optional(),
  activity: z.array(z.string()).optional(),
});

export const addressSchema = z.object({
  country: z.string(),
  city: z.string(),
  sigungu: z.string(),
});

export const LogformSchema = z.object({
  logTitle: z.string().max(30).min(1, '로그 제목은 필수입니다.'),
  thumbnail: imageFileSchema,
  logDescription: z.string(),
  places: z.array(placeSchema).min(1, '장소 1개 이상은 필수입니다.'),
  tags: tagsSchema,
  address: addressSchema,
});

/* 로그 수정 */
export const SavedPlaceImageSchema = z.object({
  image_path: z.string(),
  place_image_id: z.number(),
  order: z.number(),
  place_id: z.string(),
});

export const EditPlaceSchema = placeSchema.extend({
  id: z.string(),
  placeImages: z
    .array(SavedPlaceImageSchema)
    .max(3, { message: '최대 3장의 이미지만 업로드 가능합니다.' })
    .min(1, '장소 최소 1장은 필수입니다.'),
});

export const LogEditformSchema = z.object({
  logTitle: z.string().max(30).min(1, '로그 제목은 필수입니다.'),
  thumbnail: z.string(),
  logDescription: z.string().nullable(),
  places: z.array(EditPlaceSchema).min(1, '장소 1개 이상은 필수입니다.'),
  tags: tagsSchema,
});
