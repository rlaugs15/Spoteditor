'use client';

import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import TextCounter from './TextCounter';

export default function ProfileFormFields() {
  const { control, watch } = useFormContext();
  const { nickname: nicknameLeng, description: descLeng } = watch();
  return (
    <section>
      <p className="mt-8 mb-4 font-bold text-text-md web:text-text-2xl">프로필 편집</p>
      <div className="flex flex-col gap-5">
        <FormField
          control={control}
          name="nickname"
          render={({ field }) => (
            <FormItem className="border-b-[1px] border-b-primary-100">
              <div className="flex items-center justify-between py-[5px]">
                <FormLabel className="font-bold text-text-sm">닉네임</FormLabel>
                <TextCounter length={nicknameLeng.length} maxLength={30} />
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="유저의 현재 닉네임"
                  className="text-text-sm font-medium placeholder:text-text-sm py-[5px] px-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="border-b-[1px] border-b-primary-100">
              <div className="flex items-center justify-between py-[5px]">
                <FormLabel className="font-bold text-text-sm">프로필 설명</FormLabel>
                <TextCounter length={descLeng.length} maxLength={50} />
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="프로필 설명을 입력하세요."
                  className="text-text-sm font-medium placeholder:text-text-sm py-[5px] px-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="insta_id"
          render={({ field }) => (
            <FormItem className="border-b-[1px] border-b-primary-100">
              <div className="flex items-center justify-start py-[5px]">
                <FormLabel className="font-bold text-text-sm">인스타그램</FormLabel>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="@"
                  className="text-text-sm font-medium placeholder:text-text-sm py-[5px] px-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
