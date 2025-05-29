'use client';

import { userKeys } from '@/app/actions/keys';
import { uploadFile } from '@/app/actions/storage';
import { patchUser } from '@/app/actions/user';
import AvatarEditSection from '@/components/features/profile-editor/AvatarEditSection';
import ProfileFormFields from '@/components/features/profile-editor/ProfileFormFields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useUser from '@/hooks/queries/user/useUser';
import { profileEditorSchema } from '@/lib/zod/profileSchema';
import { compressImageToWebp } from '@/utils/compressImageToWebp';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ProfileSetting() {
  const router = useRouter();
  const { data: me } = useUser();
  const queryClient = useQueryClient();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(profileEditorSchema),
    defaultValues: {
      nickname: me?.nickname ?? '',
      image_url: me?.image_url ?? '',
      description: me?.description ?? '',
      insta_id: me?.insta_id ?? '',
    },
  });

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };

  const onSubmit = async (data: z.infer<typeof profileEditorSchema>) => {
    const nickname = data.nickname.trim();
    const description = data.description;
    const insta_id = data.insta_id
      ? data.insta_id.trim().startsWith('@')
        ? data.insta_id.trim()
        : `@${data.insta_id.trim()}`
      : undefined;

    let image_url: string | undefined = undefined;

    if (imageFile) {
      const resizingFile = await compressImageToWebp(imageFile, { maxWidthOrHeight: 300 });
      if (!resizingFile) {
        console.error('이미지 압축 실패: resizingFile이 undefined');
        return;
      }
      const uploadResult = await uploadFile('profiles', resizingFile, {
        folder: me?.user_id,
        subfolder: '',
        filename: `${me?.user_id}.webp`,
      });
      if (uploadResult?.fullPath) {
        image_url = uploadResult.fullPath;
      }
    }

    // 변경 감지 로직(프리즈마는 값이 undefined인 필드는 db에 업로드 안 함)
    const updateData = {
      userId: me?.user_id!,
      nickname: nickname !== me?.nickname ? nickname : undefined,
      image_url: image_url ?? undefined, // 업로드된 경우만
      insta_id: insta_id !== me?.insta_id ? insta_id : undefined,
      description: description !== me?.description ? description : undefined,
    };

    //캐시 무효화 추가
    await patchUser(updateData);
    queryClient.invalidateQueries({ queryKey: userKeys.me() });
    queryClient.invalidateQueries({ queryKey: userKeys.publicUser(String(me?.user_id)) });
    router.push(`/profile/${me?.user_id}`);
    //router.refresh();
  };

  return (
    <main className="flex flex-col pt-7.5 web:pt-15 mx-4 web:mx-12.5 mb-35 web:mb-25">
      <div className="w-full web:w-[661px] flex flex-col px-4 web:px-0 web:mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log('폼 에러 발생', errors);
            })}
            className="flex flex-col w-full"
          >
            {/* 아바타 섹션 */}
            <AvatarEditSection imageUrl={me?.image_url ?? ''} onFileChange={handleImageChange} />

            {/* 프로필 편집 섹션 */}
            <ProfileFormFields />

            <section className="flex justify-between mt-12.5">
              <Button type="button" variant="outline" className="rounded-[6px] w-30 h-10.5">
                취소
              </Button>
              <Button type="submit" className="rounded-[6px] w-30 h-10.5">
                저장
              </Button>
            </section>
          </form>
        </Form>
      </div>
    </main>
  );
}
