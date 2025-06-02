import { z } from 'zod';

export const profileEditorSchema = z.object({
  nickname: z
    .string()
    .max(30, { message: '닉네임은 30글자를 넘을 수 없습니다.' })
    .min(1, { message: '닉네임을 입력해주세요.' }),
  image_url: z.union([z.string(), z.literal('')]).optional(),
  /* .refine( 폼 제출 안되는 버그 요인, 추후 재활용 필요
      (val) => {
        return /\.(jpeg|jpg|png|gif)$/i.test(val);
      },
      { message: '이미지는 JPEG, PNG, GIF만 업로드 가능합니다.' }
    ) */
  description: z.union([
    z.string().max(50, { message: '프로필 설명은 50글자를 넘을 수 없습니다.' }),
    z.literal(''),
  ]),
  insta_id: z.union([
    z.string(),
    z.literal(''), // 빈 문자열 허용
  ]),
});
