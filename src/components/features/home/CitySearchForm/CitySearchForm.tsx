'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { citySearchSchema } from '@/lib/zod/searchSchema';
import { useCitySearchStore } from '@/stores/searchStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SearchDropBox from './SearchDropBox/SearchDropBox';

export default function CitySearchForm() {
  const t = useTranslations('HomePage.citySearchForm');
  const router = useRouter();
  const { isDropBox, city, sigungu, isCityDropBox, toggleSigunguDropBox } = useCitySearchStore();

  const defaultValues = {
    city: '서울',
    sigungu: '송파구',
  };

  const form = useForm({
    resolver: zodResolver(citySearchSchema),
    defaultValues,
  });

  // 쥬스탄드 값이 변경되었을 때 form 상태 업데이트
  useEffect(() => {
    if (city) {
      form.setValue('city', city);
    }
    if (sigungu) {
      form.setValue('sigungu', sigungu);
    }
  }, [city, sigungu, form]);

  const onSearchSubmit = async ({ sigungu }: z.infer<typeof citySearchSchema>) => {
    /* 추후 모달창 닫혔을 경우 검색할 수 있는 기능 추가 */
    router.push(`/search?keyword=${sigungu}`);
  };

  const opencityDropBoxClick = () => {
    if (isDropBox && isCityDropBox) {
      // 이미 시 드롭박스가 열려 있으면 닫기
      useCitySearchStore.getState().closeDropBox();
    } else {
      // 그렇지 않으면 기존 동작 유지
      useCitySearchStore.getState().toggleCityDropBox();
    }
  };

  const opensigunguDropBoxClick = () => {
    toggleSigunguDropBox();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSearchSubmit)}
          className="flex flex-col gap-2.5 web:grid web:grid-cols-[3fr_70px] relative bottom-0 web:z-30"
        >
          <div className="grid grid-cols-2 gap-2.5">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white web:px-5 px-3 web:py-5 web:pb-3 py-2.5 gap-2">
                  <FormLabel className="!text-light-400 text-xs web:text-[16px]">
                    {t('cityLabel')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      onClick={opencityDropBoxClick}
                      placeholder={t('cityPlaceholder')}
                      readOnly
                      {...field}
                      className="p-0 font-bold text-black grow !text-[22px] placeholder:text-black web:text-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sigungu"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white web:px-5 px-3 web:py-5 web:pb-3 py-2.5 gap-2">
                  <FormLabel className="!text-light-400 text-xs web:text-[16px]">
                    {t('sigunguLabel')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      onClick={opensigunguDropBoxClick}
                      placeholder={t('sigunguPlaceholder')}
                      readOnly
                      {...field}
                      className="p-0 font-bold text-black grow !text-[22px] placeholder:text-black web:text-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="h-full font-medium text-white rounded-none bg-light-950 !text-text-md hover:bg-primary-900"
          >
            {t('searchButton')}
          </Button>
          <SearchDropBox />
        </form>
      </Form>
    </>
  );
}
