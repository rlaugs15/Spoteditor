'use client';

import { followKeys, logKeys, placeKeys, searchKeys, userKeys } from '@/app/actions/keys';
import Loading from '@/components/common/Loading/Loading';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { toast } from 'sonner';

interface AccountDeleteButtonProps {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  setMsg: Dispatch<SetStateAction<string>>;
}

export default function AccountDeleteButton({ setIsSuccess, setMsg }: AccountDeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const t = useTranslations('ProfileEditor.account.toast');
  const c = useTranslations('ProfileEditor.common');

  const handleDelete = () => {
    if (isPending) return;

    startTransition(async () => {
      const res = await fetch('/api/user', { method: 'POST' });
      const result = await res.json();

      if (result.success) {
        const supabase = createClient();
        await supabase.auth.signOut(); // 쿠키 삭제

        const keysToRemove = [
          userKeys.all,
          followKeys.all,
          logKeys.all,
          placeKeys.all,
          searchKeys.all,
        ];
        keysToRemove.forEach((key) => {
          queryClient.removeQueries({ queryKey: key, exact: false });
        });

        setIsSuccess(true);
        toast.success(t('success'));
      } else {
        toast.error(t('error'));
      }
      setMsg(result.msg);
    });
  };
  return (
    <Button onClick={handleDelete} size="sm" className="w-[100px] text-[13px]">
      {isPending ? <Loading /> : c('ok')}
    </Button>
  );
}
