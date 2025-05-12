import { z } from 'zod';

export const imageFileSchema = z.union([z.string(), z.instanceof(File)]);

export const PlaceimageSchema = z.object({
  file: imageFileSchema,
  order: z.number(),
});

export const placeSchema = z.object({
  placeName: z.string().min(1, '장소 이름은 필수입니다.'),
  category: z.string().min(1, '카테고리명은 필수입니다.'),
  location: z.string().min(1, '위치 정보 필수입니다.'),
  description: z.string(),
  placeImages: z
    .array(PlaceimageSchema)
    .max(3, { message: '최대 3장의 이미지만 업로드 가능합니다.' })
    .min(1, '장소 최소 1장은 필수입니다.'),
});

export const formSchema = z.object({
  logTitle: z.string().max(30).min(1, '로그 제목은 필수입니다.'),
  thumbnail: imageFileSchema,
  logDescription: z.string(),
  places: z.array(placeSchema),
});
