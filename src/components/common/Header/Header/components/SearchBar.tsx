'use client';

import { SearchIcon } from '@/components/common/Icons';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SearchForm, searchSchema } from '@/lib/zod/searchSchema';
import { useSearchStore } from '@/stores/searchStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

export default function SearchBar() {
  const router = useRouter();
  const isOpen = useSearchStore((state) => state.isOpen);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('SearchPage');

  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      keyword: '',
    },
  });

  const { toggleSearchBar } = useSearchStore();

  const onSearchSubmit = ({ keyword }: SearchForm) => {
    form.reset();
    router.push(`/search?keyword=${keyword}`);
    toggleSearchBar();
  };
  /* fixed top-[60px] */
  const onCloseOverlayClick = () => {
    toggleSearchBar();
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.nav
            initial={{ translateY: -200, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -200, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 web:px-12.5 -z-10 py-7.5 fixed w-full flex justify-center items-center border-t-primary-900 border-t-[1px] bg-black top-11 left-0 web:top-[61px]"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSearchSubmit)}
                className="flex w-[655px] p-0 h-auto items-center bg-light-950"
              >
                <FormField
                  control={form.control}
                  name="keyword"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder={t('input.placeholder')}
                          {...field}
                          ref={inputRef}
                          style={{ color: 'white' }}
                          className="bg-inherit pl-[25px] caret-white text-white placeholder:text-primary-600 text-text-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button className="px-[25px] py-4.5 hover:cursor-pointer">
                  <SearchIcon />
                </button>
              </form>
            </Form>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseOverlayClick}
            className="fixed top-0 left-0 w-screen h-screen -z-20 bg-black/80"
          />
        </>
      ) : null}
    </AnimatePresence>
  );
}
