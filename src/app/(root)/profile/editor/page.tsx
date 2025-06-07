'use client';

import { userKeys } from '@/app/actions/keys';
import { getSignedUploadUrl } from '@/app/actions/storage';
import { patchUser } from '@/app/actions/user';
import AccountDeleteSection from '@/components/features/profile-editor/AccountDeleteSection/AccountDeleteSection';
import AvatarEditSection from '@/components/features/profile-editor/AvatarEditSection';
import ProfileFormFields from '@/components/features/profile-editor/ProfileFormFields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useUser from '@/hooks/queries/user/useUser';
import { removeImageIfNeeded, uploadToSignedUrl } from '@/lib/utils';
import { profileEditorSchema } from '@/lib/zod/profileSchema';
import { buildPublicUrl } from '@/utils/buildPublicUrl';
import { compressImageToWebp } from '@/utils/compressImageToWebp';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const Loading = dynamic(() => import('@/components/common/Loading/Loading'), {
  ssr: false,
});

export default function ProfileEditorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: me } = useUser();

  const queryClient = useQueryClient();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(profileEditorSchema),
    defaultValues: {
      nickname: '',
      image_url: '',
      description: '',
      insta_id: '',
    },
  });

  useEffect(() => {
    if (me) {
      form.reset({
        nickname: me.nickname ?? '',
        image_url: me.image_url ?? '',
        description: me.description ?? '',
        insta_id: me.insta_id ?? '',
      });
    }
  }, [me, form]);

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };

  const onSubmit = async (data: z.infer<typeof profileEditorSchema>) => {
    setIsSubmitting(true);

    try {
      if (!me) {
        console.error('사용자 정보가 없습니다.');
        return;
      }

      const nickname = data.nickname.trim();
      const description = data.description;
      const insta_id = data.insta_id
        ? data.insta_id.trim().startsWith('@')
          ? data.insta_id.trim()
          : `@${data.insta_id.trim()}`
        : undefined;

      let image_url: string | undefined = undefined;

      if (imageFile) {
        /** 1.기존 이미지 삭제 (image_url이 있고, 기본 이미지가 아닐 경우) */
        if (
          me.image_url &&
          (me.image_url.includes('/storage/v1/object/public/profiles/') || // 절대 경로
            me.image_url.startsWith('profiles/')) && // 상대 경로
          !me.image_url.includes('user-default-avatar') // 기본 이미지가 아님
        ) {
          try {
            await removeImageIfNeeded(me.image_url, 'profiles');
          } catch (error) {
            console.warn('기존 이미지 삭제 실패:', error);
            return;
          }
        }

        /** 2.새 이미지 압축 */
        const resizingFile = await compressImageToWebp(imageFile, { maxWidthOrHeight: 300 });
        if (!resizingFile) {
          console.error('이미지 압축 실패: resizingFile이 undefined');
          return;
        }

        /** 3.서버에서 PreSigned URL 발급 + fetch 업로드 */
        const filename = `${me?.user_id}${Date.now()}.webp`;
        const { signedUrl, path } = await getSignedUploadUrl('profiles', filename);
        const ok = await uploadToSignedUrl(signedUrl, resizingFile.type, resizingFile);
        if (!ok) {
          console.error('업로드 실패');
          return;
        }
        /** 4.public URL 생성 후 patch */
        image_url = buildPublicUrl('profiles', path);
      }

      // 변경 감지 로직(프리즈마는 값이 undefined인 필드는 db에 업로드 안 함)
      const updateData = {
        userId: me.user_id,
        nickname: nickname !== me?.nickname ? nickname : undefined,
        image_url: image_url ?? undefined, // 업로드된 경우만
        insta_id: insta_id !== me?.insta_id ? insta_id : undefined,
        description: description !== me?.description ? description : undefined,
      };

      //캐시 무효화 추가
      await patchUser(updateData);

      queryClient.removeQueries({ queryKey: userKeys.me(), exact: true });
      queryClient.removeQueries({ queryKey: userKeys.publicUser(String(me.user_id)), exact: true });

      router.push(`/profile/${me.user_id}`);
      toast.success('회원 정보 수정 성공');
    } catch (_error) {
      toast.error('회원 정보 수정 실패');
    } finally {
      setIsSubmitting(false);
    }
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

            {/* 계정삭제 섹션 */}
            <AccountDeleteSection />

            <section className="flex justify-between mt-12.5">
              <Button
                onClick={() => router.back()}
                type="button"
                variant="outline"
                className="rounded-[6px] w-30 h-10.5"
              >
                취소
              </Button>
              <Button type="submit" className="rounded-[6px] w-30 h-10.5">
                {isSubmitting ? <Loading /> : '저장'}
              </Button>
            </section>
          </form>
        </Form>
      </div>
    </main>
  );
}
