'use server';

import { createClient } from '@/lib/supabase/server';

/* 로그인, 로그아웃 */
export async function checkFiles() {
  const supabase = await createClient();
  // const { data, error } = await supabase.storage.listBuckets();
  const { data, error } = await supabase.storage
    .from('places')
    // .list(
    //   '95c39410-08cd-4b4c-9773-1631da62a559/871993c2-3c3a-44ac-a30f-9b96ac0e3a16/540b8c2e-ba0f-4308-b650-c75a994ae8e4/2.webp',
    //   {
    //     limit: 100,
    //     offset: 0,
    //     sortBy: { column: 'name', order: 'asc' },
    //   }
    // );
    .remove([
      '95c39410-08cd-4b4c-9773-1631da62a559/871993c2-3c3a-44ac-a30f-9b96ac0e3a16/540b8c2e-ba0f-4308-b650-c75a994ae8e4/2.webp',
    ]);
  // .from('places')
  // .list(
  //   '95c39410-08cd-4b4c-9773-1631da62a559/871993c2-3c3a-44ac-a30f-9b96ac0e3a16/540b8c2e-ba0f-4308-b650-c75a994ae8e4'
  // );

  console.log('폴더 내 파일들:', data);
  console.log('에러:', error);
}
