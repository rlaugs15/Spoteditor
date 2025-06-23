'use client';

import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import TextCounter from './TextCounter';

export default function ProfileFormFields() {
  const { control, watch } = useFormContext();
  const { nickname: nicknameLeng, description: descLeng } = watch();

  const t = useTranslations('ProfileEditor');
  return (
    <section>
      <p className="mt-8 mb-4 font-bold text-text-md web:text-text-2xl">{t('title')}</p>
      <div className="flex flex-col gap-5">
        {/* 닉네임 */}
        <FormField
          control={control}
          name="nickname"
          render={({ field }) => (
            <FormItem className="border-b-[1px] border-b-primary-100">
              <div className="flex items-center justify-between py-[5px]">
                <FormLabel className="font-bold text-text-sm"> {t('title')}</FormLabel>
                <TextCounter length={nicknameLeng.length} maxLength={30} />
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('nickname.label')}
                  className="!text-text-sm text-light-500 font-medium placeholder:text-text-sm py-[5px] px-0"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 프로필 설명 */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="border-b-[1px] border-b-primary-100">
              <div className="flex items-center justify-between py-[5px]">
                <FormLabel className="font-bold text-text-sm">{t('description.label')}</FormLabel>
                <TextCounter length={descLeng.length} maxLength={50} />
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('description.placeholder')}
                  className="!text-text-sm text-light-500 font-medium placeholder:text-text-sm py-[5px] px-0"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 인스타그램 */}
        <FormField
          control={control}
          name="insta_id"
          render={({ field }) => (
            <FormItem className="border-b-[1px] border-b-primary-100">
              <div className="flex items-center justify-start py-[5px]">
                <FormLabel className="font-bold text-text-sm">{t('instagram.label')}</FormLabel>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="@"
                  className="!text-text-sm text-light-500 font-medium placeholder:text-text-sm py-[5px] px-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
